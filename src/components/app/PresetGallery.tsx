import { PRESETS, Preset } from "@/lib/presets"
import { THEMES } from "@/lib/themes"
import { Sparkles } from "lucide-react"

interface PresetGalleryProps {
    onSelectPreset: (preset: Preset) => void
}

export function PresetGallery({ onSelectPreset }: PresetGalleryProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Quick Start</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((preset) => {
                    const theme = THEMES.find(t => t.id === preset.defaultThemeId)
                    const bg = theme?.backgroundGradient || theme?.background || '#18181b'
                    const textColor = theme?.textColor || '#fff'

                    return (
                        <button
                            key={preset.id}
                            onClick={() => onSelectPreset(preset)}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 text-left transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                            style={{ background: bg, minHeight: '140px' }}
                        >
                            {/* Content */}
                            <div className="relative z-10 p-4 flex flex-col justify-between h-full" style={{ color: textColor, minHeight: '140px' }}>
                                <div>
                                    <div className="font-bold text-base leading-tight">
                                        {preset.title}
                                    </div>
                                    <div className="text-xs mt-1 opacity-70">
                                        {preset.microcopy}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-xs font-mono opacity-60">
                                        {preset.mode === 'countdown' ? `${preset.targetValue}d` : `0/${preset.targetValue}`}
                                    </span>
                                    <span
                                        className="text-xs font-bold px-3 py-1.5 rounded-full transition-all group-hover:scale-105"
                                        style={{
                                            backgroundColor: theme?.accent || '#fff',
                                            color: theme?.background || '#000',
                                        }}
                                    >
                                        Start →
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
