export interface Theme {
    id: string
    name: string
    /** Solid background color (used if no gradient) */
    background: string
    /** CSS gradient string (overrides background if set) */
    backgroundGradient?: string
    /** Primary accent color */
    accent: string
    /** Secondary accent (optional) */
    accentSecondary?: string
    /** Text color */
    textColor: string
    /** Filled punch dot color */
    punchFilled: string
    /** Empty punch dot color (usually rgba) */
    punchEmpty: string
    /** CSS box-shadow for glow on filled punches */
    glow?: string
    /** Add subtle grain overlay */
    grain?: boolean
    /** Font family override */
    fontFamily?: string
}

export const THEMES: Theme[] = [
    {
        id: "miami-neon",
        name: "Miami Neon",
        background: "#050814",
        accent: "#00E5FF",
        accentSecondary: "#FF2BD6",
        textColor: "#FFFFFF",
        punchFilled: "#00E5FF",
        punchEmpty: "rgba(255,255,255,0.18)",
        glow: "0 0 8px rgba(0,229,255,0.6)",
        fontFamily: "'Inter', sans-serif",
    },
    {
        id: "sunset-punch",
        name: "Sunset Punch",
        background: "#FF5F6D",
        backgroundGradient: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 50%, #7F00FF 100%)",
        accent: "#FF2D95",
        textColor: "#FFFFFF",
        punchFilled: "#FF2D95",
        punchEmpty: "rgba(255,255,255,0.22)",
        fontFamily: "'Inter', sans-serif",
    },
    {
        id: "electric-lime",
        name: "Electric Lime",
        background: "#070707",
        accent: "#B6FF2E",
        textColor: "#FFFFFF",
        punchFilled: "#B6FF2E",
        punchEmpty: "rgba(255,255,255,0.14)",
        grain: true,
        fontFamily: "'Inter', sans-serif",
    },
    {
        id: "ocean-pop",
        name: "Ocean Pop",
        background: "#00C6FF",
        backgroundGradient: "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
        accent: "#FF6B6B",
        textColor: "#FFFFFF",
        punchFilled: "#00F5D4",
        punchEmpty: "rgba(255,255,255,0.20)",
        fontFamily: "'Inter', sans-serif",
    },
    {
        id: "grape-soda",
        name: "Grape Soda",
        background: "#3A0CA3",
        backgroundGradient: "linear-gradient(135deg, #3A0CA3 0%, #7209B7 50%, #F72585 100%)",
        accent: "#F9C74F",
        textColor: "#FFFFFF",
        punchFilled: "#F72585",
        punchEmpty: "rgba(255,255,255,0.18)",
        fontFamily: "'Inter', sans-serif",
    },
    {
        id: "candy-pastel",
        name: "Candy Pastel",
        background: "#FFAFCC",
        backgroundGradient: "linear-gradient(135deg, #FFAFCC 0%, #BDE0FE 50%, #CDB4DB 100%)",
        accent: "#FF4D9D",
        textColor: "#111827",
        punchFilled: "#FF4D9D",
        punchEmpty: "rgba(17,24,39,0.18)",
        fontFamily: "'Inter', sans-serif",
    },
]

export function getThemeById(id: string): Theme {
    const theme = THEMES.find((t) => t.id === id)
    if (!theme) {
        throw new Error(`Theme not found: "${id}". Available: ${THEMES.map(t => t.id).join(', ')}`)
    }
    return theme
}
