import { cn } from "@/lib/utils"
import { THEMES } from "@/lib/themes"

interface TemplateSelectorProps {
    selectedId: string
    onSelect: (id: string) => void
}

const TEMPLATES = [
    {
        id: "punch-card",
        name: "Punch Card",
        preview: THEMES[0].backgroundGradient || THEMES[0].background,
    },
    { id: "minimal", name: "Classic Mono", color: "bg-zinc-700" },
    { id: "warm", name: "Classic Warm", color: "bg-gradient-to-br from-pink-300 to-pink-500" },
]

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {TEMPLATES.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={cn(
                        "group relative aspect-[9/16] w-full overflow-hidden rounded-lg border-2 transition-all",
                        selectedId === t.id
                            ? "border-primary ring-2 ring-primary ring-offset-2"
                            : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                    )}
                >
                    <div
                        className={cn("absolute inset-0", t.color)}
                        style={t.preview ? { background: t.preview } : undefined}
                    />
                    <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium text-white shadow-sm">
                        {t.name}
                    </div>
                </button>
            ))}
        </div>
    )
}
