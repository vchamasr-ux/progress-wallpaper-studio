export type GeneratorMode = "countdown" | "progress"

export interface WallpaperData {
    mode: GeneratorMode
    title: string
    // Countdown specific
    targetDate: string // YYYY-MM-DD
    startDate?: string // YYYY-MM-DD
    // Progress specific
    currentValue: number
    targetValue: number
    // Common
    templateId: string
    themeId: string
}

export interface TemplateProps {
    data: WallpaperData
    width?: number // default 1080
    height?: number // default 1920
    scale?: number // default 1
    watermark?: boolean
}

export const INITIAL_DATA: WallpaperData = {
    mode: "countdown",
    title: "Trip to Japan",
    targetDate: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0], // 30 days from now
    currentValue: 0,
    targetValue: 100,
    templateId: "punch-card",
    themeId: "miami-neon",
}
