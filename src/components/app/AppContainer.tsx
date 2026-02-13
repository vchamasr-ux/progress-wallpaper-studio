"use client"

import { useState } from "react"
import { GoalsView } from "./views/GoalsView"
import { EditView } from "./views/EditView"
import { DownloadsView } from "./views/DownloadsView"
import { WallpaperData, GeneratorMode } from "@/lib/types"
import { Preset } from "@/lib/presets"

export type AppView = 'goals' | 'edit' | 'downloads'

export interface Goal extends WallpaperData {
    id: string
    createdAt: number
}

// SEED DATA
const SEED_GOALS: Goal[] = [
    {
        id: "seed-1",
        createdAt: Date.now(),
        mode: "progress",
        title: "30 Workouts",
        currentValue: 12,
        targetValue: 30,
        targetDate: "",
        templateId: "punch-card",
        themeId: "electric-lime",
    },
    {
        id: "seed-2",
        createdAt: Date.now() - 1000,
        mode: "progress",
        title: "Read 12 Books",
        currentValue: 3,
        targetValue: 12,
        targetDate: "",
        templateId: "punch-card",
        themeId: "grape-soda",
    },
    {
        id: "seed-3",
        createdAt: Date.now() - 2000,
        mode: "countdown",
        title: "Bali Trip",
        currentValue: 0,
        targetValue: 100,
        targetDate: new Date(Date.now() + 86400000 * 60).toISOString().split('T')[0],
        templateId: "punch-card",
        themeId: "ocean-pop",
    }
]

export function AppContainer() {
    // STATE
    const [activeView, setActiveView] = useState<AppView>('goals')
    const [goals, setGoals] = useState<Goal[]>(SEED_GOALS)
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

    const activeGoal = goals.find(g => g.id === selectedGoalId) || goals[0]

    // ACTIONS
    const handleCreateGoal = () => {
        const newGoal: Goal = {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            mode: "progress",
            title: "New Goal",
            currentValue: 0,
            targetValue: 10,
            targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            templateId: "punch-card",
            themeId: "miami-neon",
        }
        setGoals([newGoal, ...goals])
        setSelectedGoalId(newGoal.id)
        setActiveView('edit')
    }

    const handleCreateFromPreset = (preset: Preset) => {
        const newGoal: Goal = {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            mode: preset.mode,
            title: preset.title,
            currentValue: 0,
            targetValue: preset.targetValue,
            targetDate: preset.defaultDaysFromNow
                ? new Date(Date.now() + preset.defaultDaysFromNow * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                : "",
            templateId: "punch-card",
            themeId: preset.defaultThemeId,
        }
        setGoals([newGoal, ...goals])
        setSelectedGoalId(newGoal.id)
        setActiveView('edit')
    }

    const handleDeleteGoal = (id: string) => {
        if (confirm("Are you sure you want to delete this goal?")) {
            setGoals(goals.filter(g => g.id !== id))
            if (selectedGoalId === id) {
                setSelectedGoalId(null)
                setActiveView('goals')
            }
        }
    }

    const handleSelectGoal = (id: string) => {
        setSelectedGoalId(id)
        setActiveView('edit')
    }

    const handleSaveGoal = (updatedGoal: Goal) => {
        setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g))
        setActiveView('goals')
    }

    const handleGenerate = (updatedGoal: Goal) => {
        setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g))
        setActiveView('downloads')
    }

    return (
        <div className="max-w-md mx-auto min-h-screen bg-background border-x shadow-xl flex flex-col">
            {/* TAB NAV */}
            <div className="p-4 border-b bg-card z-10 sticky top-0">
                <div className="grid grid-cols-3 p-1 bg-muted rounded-lg">
                    {(['goals', 'edit', 'downloads'] as AppView[]).map(view => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`text-sm font-medium py-2 rounded-md transition-all ${activeView === view
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* VIEWS */}
            <div className="flex-1 p-4 overflow-y-auto">
                {activeView === 'goals' && (
                    <GoalsView
                        goals={goals}
                        onCreate={handleCreateGoal}
                        onSelect={handleSelectGoal}
                        onDelete={handleDeleteGoal}
                        onCreateFromPreset={handleCreateFromPreset}
                    />
                )}

                {activeView === 'edit' && selectedGoalId && (
                    <EditView
                        initialGoal={activeGoal}
                        onSave={handleSaveGoal}
                        onGenerate={handleGenerate}
                    />
                )}

                {activeView === 'edit' && !selectedGoalId && (
                    <div className="text-center py-10 text-muted-foreground">Please select a goal first.</div>
                )}

                {activeView === 'downloads' && (
                    <DownloadsView
                        goal={activeGoal}
                    />
                )}
            </div>
        </div>
    )
}
