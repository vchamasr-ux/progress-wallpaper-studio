import { Button } from "@/components/ui/button"
import { GeneratorMode } from "@/lib/types"
import { Calendar, Percent } from "lucide-react"

interface ModeSelectorProps {
    mode: GeneratorMode
    onModeChange: (mode: GeneratorMode) => void
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
    return (
        <div className="flex w-full rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
                onClick={() => onModeChange("countdown")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all ${mode === "countdown"
                        ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
            >
                <Calendar className="h-4 w-4" />
                Countdown
            </button>
            <button
                onClick={() => onModeChange("progress")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-all ${mode === "progress"
                        ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
            >
                <Percent className="h-4 w-4" />
                Progress
            </button>
        </div>
    )
}
