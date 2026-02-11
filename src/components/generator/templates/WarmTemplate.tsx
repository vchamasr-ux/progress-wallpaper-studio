import { MinimalTemplate } from "@/components/generator/templates/MinimalTemplate"
import { CSSProperties } from "react"
import { WallpaperData } from "@/lib/types"

// Soft sunset gradient (Pink/Orange)
// High contrast text (White with shadow or dark with light bg? Warm usually implies light/sunny)
// Prototype spec: "soft sunset gradient (pink/orange), readable high-contrast text, clean."

export function WarmTemplate({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
    const isCountdown = data.mode === 'countdown'

    // Calculate progress/days
    let mainDisplay = ""
    let subDisplay = ""
    let progress = 0

    if (isCountdown) {
        if (data.targetDate) {
            const target = new Date(data.targetDate).getTime()
            const now = new Date().getTime() // Should be consistent?
            const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
            mainDisplay = `${Math.max(0, diff)}`
            subDisplay = "DAYS LEFT"
            progress = 100 // Countdown doesn't really have a progress bar unless we have start date
        } else {
            mainDisplay = "--"
            subDisplay = "DAYS LEFT"
        }
    } else {
        mainDisplay = `${data.currentValue}`
        subDisplay = `/ ${data.targetValue}`
        progress = Math.min(100, Math.max(0, (data.currentValue / data.targetValue) * 100))
    }

    const containerStyle: CSSProperties = {
        width,
        height,
        background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', // Pinkish gradient
        // Alternative Warm: linear-gradient(to bottom, #f6d365 0%, #fda085 100%) (Sunny)
        // Let's go with the requested "soft sunset (pink/orange)"
        backgroundImage: 'linear-gradient(to bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // White text on pink/orange is usually okay if drop shadow
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden'
    }

    return (
        <div style={containerStyle}>
            {/* Dynamic Island / Notch Safety */}
            <div style={{ position: 'absolute', top: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)' }} />

            {/* Content */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                {/* Title */}
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 600,
                    marginBottom: '40px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    color: '#FFF'
                }}>
                    {data.title || "GOAL TITLE"}
                </h1>

                {/* Main Number */}
                <div style={{
                    fontSize: '180px',
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}>
                    {mainDisplay}
                </div>

                {/* Sub/Label */}
                <div style={{
                    fontSize: '32px',
                    fontWeight: 500,
                    opacity: 0.9,
                    marginTop: '10px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    {subDisplay}
                </div>
            </div>

            {/* Progress Bar (if Progress mode) */}
            {!isCountdown && (
                <div style={{
                    width: '60%',
                    height: '12px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '10px',
                    marginTop: '60px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: '#FFF',
                        borderRadius: '10px'
                    }} />
                </div>
            )}

            {/* Watermark */}
            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    fontSize: '24px',
                    opacity: 0.6,
                    fontWeight: 500,
                    textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
