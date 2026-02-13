import { THEMES, Theme } from "@/lib/themes"
import { Check } from "lucide-react"

interface ThemeSelectorProps {
    selectedThemeId: string
    onSelect: (themeId: string) => void
}

export function ThemeSelector({ selectedThemeId, onSelect }: ThemeSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Visual Theme</label>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {THEMES.map((theme) => {
                    const isSelected = theme.id === selectedThemeId
                    const bg = theme.backgroundGradient || theme.background

                    return (
                        <button
                            key={theme.id}
                            onClick={() => onSelect(theme.id)}
                            className={`relative flex-shrink-0 w-14 h-14 rounded-xl border-2 transition-all hover:scale-105 ${isSelected
                                    ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                                    : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
                                }`}
                            style={{ background: bg }}
                            title={theme.name}
                        >
                            {/* Small punch dot preview */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: theme.punchFilled,
                                        boxShadow: theme.glow || 'none',
                                    }}
                                />
                            </div>
                            {isSelected && (
                                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                                    <Check className="w-2.5 h-2.5" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
            <p className="text-xs text-muted-foreground">
                {THEMES.find(t => t.id === selectedThemeId)?.name || "Select a theme"}
            </p>
        </div>
    )
}
