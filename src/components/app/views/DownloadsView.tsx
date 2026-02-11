import { useState } from "react"
import { Goal } from "../AppContainer"
import { Button } from "@/components/ui/button"
import { Download, Loader2, Share2, Smartphone, Check, Lock, ChevronDown } from "lucide-react"
import { generateExport, ExportTarget, DeviceType } from "@/lib/generator"
import { MinimalTemplate } from "@/components/generator/templates/MinimalTemplate"
// Templates
import { PunchMinimal } from "@/components/generator/templates/PunchMinimal"
import { PunchWarm } from "@/components/generator/templates/PunchWarm"
import { PunchNeon } from "@/components/generator/templates/PunchNeon"
import { WarmTemplate } from "@/components/generator/templates/WarmTemplate"
import { AuraTemplate } from "@/components/generator/templates/AuraTemplate"
import { GlitchTemplate } from "@/components/generator/templates/GlitchTemplate"

const TEMPLATE_MAP: Record<string, React.ComponentType<any>> = {
    "punch-minimal": PunchMinimal,
    "punch-warm": PunchWarm,
    "punch-neon": PunchNeon,
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
    const [device, setDevice] = useState<DeviceType>('iphone')

    // Handle Template rendering for capture
    const TemplateComponent = TEMPLATE_MAP[goal.templateId] || PunchMinimal

    // Check if current template is a "Pro" template (all except Minimal are "Pro" effectively in this model?)
    // Prompt says: "Free: limited templates + watermark".
    // Let's say PunchMinimal is Free, others are Pro?
    // Or maybe just Watermark is the main differentiator for now.
    // "Pro: all templates + no watermark + advanced exports"
    // So Free has watermark.

    const handleAction = async (target: ExportTarget) => {
        setIsGenerating(target)
        // Delay to allow UI to update
        await new Promise(resolve => setTimeout(resolve, 100))
        try {
            await generateExport(goal, target, device)
        } catch (e) {
            console.error(e)
            alert("Export failed")
        } finally {
            setIsGenerating(null)
        }
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Your Punch Card</h2>
                <p className="text-muted-foreground">Save it, set it as wallpaper, update it tomorrow.</p>
            </div>

            {/* Device Selector */}
            <div className="flex justify-center">
                <div className="inline-flex rounded-full bg-muted p-1 border">
                    <button
                        onClick={() => setDevice('iphone')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${device === 'iphone' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        iPhone
                    </button>
                    <button
                        onClick={() => setDevice('android')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${device === 'android' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Android
                    </button>
                </div>
            </div>

            {/* Primary Actions */}
            <div className="grid gap-3">
                <Button
                    size="lg"
                    className="h-14 text-lg font-semibold bg-primary hover:bg-primary/90 w-full shadow-lg shadow-primary/20"
                    onClick={() => handleAction('lockscreen')}
                    disabled={!!isGenerating}
                >
                    {isGenerating === 'lockscreen' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Smartphone className="mr-2 h-5 w-5" />}
                    Save Lock Screen
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    className="h-14 text-lg font-semibold w-full"
                    onClick={() => handleAction('story')}
                    disabled={!!isGenerating}
                >
                    {isGenerating === 'story' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Share2 className="mr-2 h-5 w-5" />}
                    Share Story
                </Button>
            </div>

            {/* Advanced / Legacy */}
            <div className="pt-4 border-t">
                <button
                    onClick={() => handleAction('zip')}
                    disabled={!!isGenerating}
                    className="flex items-center justify-center w-full text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                >
                    {isGenerating === 'zip' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Advanced: Download Full ZIP Pack
                </button>
            </div>

            {/* Pro Status Card */}
            <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-xl p-6 border space-y-4">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">Member Status</div>
                    {isProUnlocked ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-900">
                            <Check className="w-3 h-3" /> PRO ACTIVE
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded-full border">
                            FREE PLAN
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                        <div className={`mt-0.5 p-1 rounded-full ${isProUnlocked ? 'bg-green-100 dark:bg-green-900/40 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                            {isProUnlocked ? <Check className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        </div>
                        <div>
                            <div className="font-medium">Watermark Removal</div>
                            <div className="text-muted-foreground text-xs">Clean, professional look</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                        <div className={`mt-0.5 p-1 rounded-full ${isProUnlocked ? 'bg-green-100 dark:bg-green-900/40 text-green-600' : 'bg-green-100 dark:bg-green-900/40 text-green-600'}`}>
                            <Check className="w-3 h-3" />
                        </div>
                        <div>
                            <div className="font-medium">Unimited Exports</div>
                            <div className="text-muted-foreground text-xs">Save as many updates as you need</div>
                        </div>
                    </div>
                </div>
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
                        DEV: Toggle Pro Mode
                    </label>
                </div>
            )}

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
