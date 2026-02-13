"use client"

import { useState, useEffect } from "react"
import { INITIAL_DATA, WallpaperData, GeneratorMode } from "@/lib/types"
import { ModeSelector } from "./ModeSelector"
import { TemplateSelector } from "./TemplateSelector"
import { PreviewPanel } from "./PreviewPanel"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Lock, Check } from "lucide-react"
import { generateExport } from "@/lib/generator"
import { MinimalTemplate } from "./templates/MinimalTemplate"
import { PunchCardTemplate } from "./templates/PunchCardTemplate"
import { DownloadHub } from "./DownloadHub"
import { track } from "@/lib/analytics"

export function GeneratorContainer() {
    const [data, setData] = useState<WallpaperData>(INITIAL_DATA)
    const [isGenerating, setIsGenerating] = useState(false)
    const [hasPaid, setHasPaid] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)

    // Verify session on mount if present
    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const sessionId = query.get("session_id")
        if (sessionId) {
            setIsVerifying(true)
            fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.verified) {
                        setHasPaid(true)
                        track('checkout_success')
                        // Clean URL
                        window.history.replaceState({}, "", window.location.pathname)
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setIsVerifying(false))
        }
    }, [])

    const handleModeChange = (newMode: GeneratorMode) => {
        setData((prev) => ({ ...prev, mode: newMode }))
    }

    const updateField = (field: keyof WallpaperData, value: any) => {
        setData((prev) => ({ ...prev, [field]: value }))
    }

    const handleDownload = async () => {
        try {
            if (hasPaid) {
                track('generate_clicked', { variant: data.mode }) // Using generic generate event
            } else {
                track('free_export_downloaded', { variant: data.mode })
            }

            setIsGenerating(true)
            // Small delay to allow react to render any pending state if needed
            await new Promise(resolve => setTimeout(resolve, 100))
            await generateExport(data, 'zip')
        } catch (error) {
            console.error("Export failed", error)
            alert("Failed to generate pack. Please try again.")
        } finally {
            setIsGenerating(false)
        }
    }

    const handleUnlock = async () => {
        // DEV BYPASS: If no keys configured, allow unlock for testing
        // Remove this before real production traffic if stricter security needed
        // but safe for V0 demo.
        if (process.env.NODE_ENV === 'development') {
            console.log("[DEV MODE] Stripe keys missing. Simulating success.")
            setHasPaid(true)
            track('checkout_success')
            return
        }

        track('unlock_clicked', { variant: data.mode })
        setIsCheckingOut(true)
        try {
            const res = await fetch("/api/stripe/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    successUrl: window.location.href.split('?')[0], // Base URL
                    cancelUrl: window.location.href
                })
            })
            const { url, error } = await res.json()
            if (error) {
                alert("Checkout error: " + error)
                setIsCheckingOut(false)
                return
            }
            if (url) {
                window.location.href = url
            }
        } catch (e) {
            console.error(e)
            alert("Something went wrong")
            setIsCheckingOut(false)
        }
    }

    return (
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Create your lock screen</h2>
                    <ModeSelector mode={data.mode} onModeChange={handleModeChange} />
                </div>

                <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                    {/* Inputs */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Goal Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="e.g. Trip to Japan"
                        />
                    </div>

                    {data.mode === 'countdown' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Target Date</label>
                            <input
                                type="date"
                                value={data.targetDate}
                                onChange={(e) => updateField("targetDate", e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Current</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateField("currentValue", Math.max(0, data.currentValue - 1))}
                                        className="flex h-10 w-10 items-center justify-center rounded-md border hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    >-</button>
                                    <input
                                        type="number"
                                        value={data.currentValue}
                                        onChange={(e) => updateField("currentValue", parseInt(e.target.value) || 0)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm"
                                    />
                                    <button
                                        onClick={() => updateField("currentValue", data.currentValue + 1)}
                                        className="flex h-10 w-10 items-center justify-center rounded-md border hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    >+</button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Target</label>
                                <input
                                    type="number"
                                    value={data.targetValue}
                                    onChange={(e) => updateField("targetValue", parseInt(e.target.value) || 0)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium leading-none">Template</label>
                        <TemplateSelector
                            selectedId={data.templateId}
                            onSelect={(id) => updateField("templateId", id)}
                        />
                    </div>

                    <div className="pt-4 space-y-3">
                        {hasPaid ? (
                            <DownloadHub onDownload={handleDownload} />
                        ) : (
                            <div className="space-y-4">
                                <Button
                                    onClick={handleUnlock}
                                    disabled={isCheckingOut || isVerifying}
                                    className="w-full h-12 text-lg gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0"
                                    size="lg"
                                >
                                    {isCheckingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                                    {isCheckingOut ? "Redirecting..." : isVerifying ? "Verifying..." : "Unlock Pro Pack ($6.99)"}
                                </Button>

                                <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                                    <p className="text-sm font-medium mb-3">After purchase you get:</p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" /> iPhone Pack (3 sizes)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" /> Android Pack (3 sizes)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" /> Story Share (1080x1920)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" /> No Watermark
                                        </li>
                                    </ul>
                                </div>

                                <Button
                                    onClick={handleDownload}
                                    disabled={isGenerating}
                                    variant="secondary"
                                    className="w-full h-12 text-lg gap-2"
                                    size="lg"
                                >
                                    {isGenerating ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Download className="h-5 w-5" />
                                    )}
                                    {isGenerating ? "Generating..." : "Download Free Sample (Watermarked)"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:sticky lg:top-8 lg:h-fit">
                <PreviewPanel data={data} />

                {/* Hidden Renderer for Export */}
                <div style={{ position: 'fixed', left: -9999, top: 0, opacity: 0, pointerEvents: 'none' }}>
                    <div id="capture-base">
                        {/* Dynamically render selected template */}
                        <MinimalTemplate
                            data={data}
                            width={1080}
                            height={1920}
                            watermark={!hasPaid}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
