import { GeneratorMode } from "./types"

export interface Preset {
    id: string
    title: string
    microcopy: string
    mode: GeneratorMode
    targetValue: number
    /** Default theme to apply when this preset is chosen */
    defaultThemeId: string
    /** For countdown mode: days from today */
    defaultDaysFromNow?: number
}

export const PRESETS: Preset[] = [
    {
        id: "read-12-books",
        title: "Read 12 Books",
        microcopy: "1 per month.",
        mode: "progress",
        targetValue: 12,
        defaultThemeId: "grape-soda",
    },
    {
        id: "30-workouts",
        title: "30 Workouts",
        microcopy: "Any workout counts.",
        mode: "progress",
        targetValue: 30,
        defaultThemeId: "electric-lime",
    },
    {
        id: "cook-at-home-20",
        title: "Cook at Home 20 Times",
        microcopy: "Save money, feel better.",
        mode: "progress",
        targetValue: 20,
        defaultThemeId: "sunset-punch",
    },
    {
        id: "trip-countdown",
        title: "Trip Countdown",
        microcopy: "Lock it in.",
        mode: "countdown",
        targetValue: 30,
        defaultThemeId: "ocean-pop",
        defaultDaysFromNow: 30,
    },
    {
        id: "no-buy-month",
        title: "No-Buy Month",
        microcopy: "No impulse buys — track the streak.",
        mode: "progress",
        targetValue: 30,
        defaultThemeId: "miami-neon",
    },
    {
        id: "declutter-50",
        title: "Declutter 50 Items",
        microcopy: "One item at a time.",
        mode: "progress",
        targetValue: 50,
        defaultThemeId: "candy-pastel",
    },
]
