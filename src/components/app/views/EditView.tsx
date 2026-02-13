import { useState, useEffect } from "react"
import { WallpaperData, GeneratorMode } from "@/lib/types"
import { Goal } from "../AppContainer"
import { ModeSelector } from "@/components/generator/ModeSelector"
import { TemplateSelector } from "@/components/generator/TemplateSelector"
import { ThemeSelector } from "../ThemeSelector"
import { PreviewPanel } from "@/components/generator/PreviewPanel"
import { Button } from "@/components/ui/button"
import { Save, ArrowRight } from "lucide-react"

// Templates
import { MinimalTemplate } from "@/components/generator/templates/MinimalTemplate"
import { WarmTemplate } from "@/components/generator/templates/WarmTemplate"
import { AuraTemplate } from "@/components/generator/templates/AuraTemplate"
import { GlitchTemplate } from "@/components/generator/templates/GlitchTemplate"
import { PunchCardTemplate } from "@/components/generator/templates/PunchCardTemplate"

const TEMPLATE_MAP: Record<string, React.ComponentType<any>> = {
    "punch-card": PunchCardTemplate,
    minimal: MinimalTemplate,
    warm: WarmTemplate,
    aura: AuraTemplate,
    glitch: GlitchTemplate,
    bold: MinimalTemplate,
    neon: MinimalTemplate,
    // Legacy punch IDs → redirect to universal
    "punch-minimal": PunchCardTemplate,
    "punch-warm": PunchCardTemplate,
    "punch-neon": PunchCardTemplate,
}

interface EditViewProps {
    initialGoal: Goal
    onSave: (goal: Goal) => void
    onGenerate: (goal: Goal) => void
}

export function EditView({ initialGoal, onSave, onGenerate }: EditViewProps) {
    const [data, setData] = useState<Goal>(initialGoal)

    // Sync state if initialGoal changes (e.g. selecting different goal)
    useEffect(() => {
        setData(initialGoal)
    }, [initialGoal.id])

    const updateField = (field: keyof WallpaperData, value: any) => {
        setData((prev) => ({ ...prev, [field]: value }))
    }

    const handleModeChange = (newMode: GeneratorMode) => {
        setData((prev) => ({ ...prev, mode: newMode }))
    }

    const SelectedTemplate = TEMPLATE_MAP[data.templateId] || PunchCardTemplate

    return (
        <div className="grid gap-8 pb-20">
            <div className="space-y-6">
                {/* Preview Section */}
                <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 py-4 -mx-4 px-4 border-b lg:static lg:bg-transparent lg:border-0 lg:p-0">
                    <PreviewPanel data={data} customTemplate={SelectedTemplate} />
                </div>

                <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                    {/* Goal Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Goal Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="e.g. Read 12 Books"
                        />
                    </div>

                    <ModeSelector mode={data.mode} onModeChange={handleModeChange} />

                    {data.mode === 'countdown' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Target Date</label>
                            <input
                                type="date"
                                value={data.targetDate}
                                onChange={(e) => updateField("targetDate", e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

                    {/* Theme Selector */}
                    <ThemeSelector
                        selectedThemeId={data.themeId || "miami-neon"}
                        onSelect={(id) => updateField("themeId", id)}
                    />

                    {/* Template Selector (for legacy / classic templates) */}
                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium leading-none">Template</label>
                        <TemplateSelector
                            selectedId={data.templateId}
                            onSelect={(id) => updateField("templateId", id)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 sticky bottom-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => onSave(data)}
                        className="gap-2"
                    >
                        <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button
                        size="lg"
                        onClick={() => onGenerate(data)}
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Next <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
