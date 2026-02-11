import { useState } from "react"
import { Goal } from "../AppContainer"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Smartphone, MonitorSmartphone, Share2, Check } from "lucide-react"
import { generateExport, ExportTarget } from "@/lib/generator"
import { MinimalTemplate } from "@/components/generator/templates/MinimalTemplate"
import { WarmTemplate } from "@/components/generator/templates/WarmTemplate"
import { AuraTemplate } from "@/components/generator/templates/AuraTemplate"
import { GlitchTemplate } from "@/components/generator/templates/GlitchTemplate"

const TEMPLATE_MAP: Record<string, React.ComponentType<any>> = {
    minimal: MinimalTemplate,
    warm: WarmTemplate,
    aura: AuraTemplate,
    glitch: GlitchTemplate,
    bold: MinimalTemplate,
    neon: MinimalTemplate
}

interface DownloadsViewProps {
    goal: Goal
}

export function DownloadsView({ goal }: DownloadsViewProps) {
    const [isGenerating, setIsGenerating] = useState<ExportTarget | null>(null)
    const [isProUnlocked, setIsProUnlocked] = useState(false)

    // Handle Template rendering for capture
    const TemplateComponent = TEMPLATE_MAP[goal.templateId] || MinimalTemplate

    const handleDownload = async (target: ExportTarget) => {
        setIsGenerating(target)
        // Delay to allow UI to update
        await new Promise(resolve => setTimeout(resolve, 100))
        try {
            await generateExport(goal, target)
        } catch (e) {
            console.error(e)
            alert("Export failed")
        } finally {
            setIsGenerating(null)
        }
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Export Center</h2>
                <p className="text-muted-foreground">Download your "{goal.title}" wallpaper pack.</p>
            </div>

            {/* Dev Only Toggle */}
            {process.env.NODE_ENV === 'development' && (
                <div className="p-4 border border-yellow-500/50 bg-yellow-50/10 rounded-lg flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="dev-unlock"
                        checked={isProUnlocked}
                        onChange={(e) => setIsProUnlocked(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="dev-unlock" className="text-sm font-medium text-yellow-600 dark:text-yellow-400 cursor-pointer">
                        DEV: Pro unlocked (Simulate)
                    </label>
                </div>
            )}

            <div className="grid gap-4">
                <DownloadCard
                    icon={Smartphone}
                    title="iPhone Pack"
                    desc="3 optimized sizes (ZIP)"
                    onClick={() => handleDownload('iphone')}
                    loading={isGenerating === 'iphone'}
                    isPro={isProUnlocked}
                />
                <DownloadCard
                    icon={MonitorSmartphone}
                    title="Android Pack"
                    desc="3 optimized sizes (ZIP)"
                    onClick={() => handleDownload('android')}
                    loading={isGenerating === 'android'}
                    isPro={isProUnlocked}
                />
                <DownloadCard
                    icon={Share2}
                    title="Story Share"
                    desc="1080x1920 (PNG)"
                    onClick={() => handleDownload('story')}
                    loading={isGenerating === 'story'}
                    isPro={isProUnlocked}
                />
            </div>

            <div className="bg-muted/50 rounded-xl p-6 text-sm space-y-3">
                <div className="font-medium flex items-center justify-between">
                    <span>Includes:</span>
                    {isProUnlocked ? (
                        <span className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" /> PRO UNLOCKED
                        </span>
                    ) : (
                        <span className="text-muted-foreground">Free Version</span>
                    )}
                </div>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-indigo-500" /> High Resolution
                    </li>
                    <li className="flex items-center gap-2">
                        {isProUnlocked ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
                        )}
                        {isProUnlocked ? "No Watermark" : "Watermarked"}
                    </li>
                </ul>
            </div>

            {/* Hidden Renderer */}
            <div style={{ position: 'fixed', left: -9999, top: 0, opacity: 0, pointerEvents: 'none' }}>
                <div id="capture-base">
                    <TemplateComponent
                        data={goal}
                        width={1080}
                        height={1920}
                        watermark={!isProUnlocked}
                    />
                </div>
            </div>
        </div>
    )
}

function DownloadCard({ icon: Icon, title, desc, onClick, loading, isPro }: any) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="flex items-center w-full p-4 bg-card hover:bg-zinc-50 dark:hover:bg-zinc-900 border rounded-xl transition-all group"
        >
            <div className={`p-3 rounded-lg mr-4 ${isPro ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-muted text-muted-foreground'}`}>
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Icon className="w-6 h-6" />}
            </div>
            <div className="text-left flex-1">
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-center text-muted-foreground">{desc}</div>
            </div>
            <Download className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
    )
}
