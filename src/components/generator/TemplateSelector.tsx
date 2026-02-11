import { WallpaperData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
    selectedId: string
    onSelect: (id: string) => void
}

const TEMPLATES = [
    { id: "minimal", name: "Minimal", color: "bg-zinc-900" },
    { id: "bold", name: "Bold", color: "bg-blue-600" },
    { id: "neon", name: "Neon", color: "bg-fuchsia-600" },
    { id: "warm", name: "Warm", color: "bg-gradient-to-br from-pink-300 to-pink-500" },
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
                    <div className={cn("absolute inset-0", t.color)}></div>
                    <div className="absolute bottom-2 left-0 w-full text-center text-xs font-medium text-white shadow-sm">
                        {t.name}
                    </div>
                </button>
            ))}
        </div>
    )
}
