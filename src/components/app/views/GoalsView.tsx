import { Goal } from "../AppContainer"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, ChevronRight } from "lucide-react"

interface GoalsViewProps {
    goals: Goal[]
    onCreate: () => void
    onSelect: (id: string) => void
    onDelete: (id: string) => void
}

export function GoalsView({ goals, onCreate, onSelect, onDelete }: GoalsViewProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Goals</h1>
                <Button onClick={onCreate} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> New Goal
                </Button>
            </div>

            <div className="grid gap-4">
                {goals.map(goal => (
                    <div
                        key={goal.id}
                        className="group relative flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                        onClick={() => onSelect(goal.id)}
                    >
                        <div className="space-y-1">
                            <h3 className="font-semibold">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{goal.mode} • {goal.templateId}</p>

                            {/* Mini Progress Bar or Status */}
                            {goal.mode === 'progress' && (
                                <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${Math.min(100, Math.max(0, (goal.currentValue / goal.targetValue) * 100))}%` }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive z-10"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(goal.id)
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                ))}

                {goals.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                        No goals yet. Create one to get started!
                    </div>
                )}
            </div>
        </div>
    )
}
