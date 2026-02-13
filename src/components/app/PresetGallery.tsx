import { PRESETS, Preset } from "@/lib/presets"
import { THEMES } from "@/lib/themes"
import { Sparkles, Lock } from "lucide-react"

interface PresetGalleryProps {
    onSelectPreset: (preset: Preset) => void
    isProMode: boolean
}

export function PresetGallery({ onSelectPreset, isProMode }: PresetGalleryProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold tracking-tight">Quick Start</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((preset, index) => {
                    const theme = THEMES.find(t => t.id === preset.defaultThemeId)
                    const bg = theme?.backgroundGradient || theme?.background || '#18181b'
                    const textColor = theme?.textColor || '#fff'

                    const isLocked = !isProMode && index >= 2

                    return (
                        <button
                            key={preset.id}
                            onClick={() => !isLocked && onSelectPreset(preset)}
                            disabled={isLocked}
                            className={`group relative overflow-hidden rounded-2xl border text-left transition-all ${isLocked
                                    ? 'border-zinc-800 opacity-60 cursor-not-allowed'
                                    : 'border-white/10 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
                                }`}
                            style={{ background: isLocked ? '#18181b' : bg, minHeight: '140px' }}
                        >
                            {/* Locked overlay */}
                            {isLocked && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                                    <Lock className="w-6 h-6 text-white/70" />
                                </div>
                            )}

                            {/* Content */}
                            <div className={`relative z-10 p-4 flex flex-col justify-between h-full ${isLocked ? 'grayscale opacity-50' : ''}`} style={{ color: isLocked ? '#a1a1aa' : textColor, minHeight: '140px' }}>
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
                                            backgroundColor: isLocked ? '#3f3f46' : (theme?.accent || '#fff'),
                                            color: isLocked ? '#a1a1aa' : (theme?.background || '#000'),
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
