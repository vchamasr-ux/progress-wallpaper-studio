import { WallpaperData } from "@/lib/types"
import { CSSProperties } from "react"

export function AuraTemplate({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
    const isCountdown = data.mode === 'countdown'

    // Calculate progress/days
    let mainDisplay = ""
    let subDisplay = ""

    if (isCountdown) {
        if (data.targetDate) {
            const target = new Date(data.targetDate).getTime()
            const now = new Date().getTime()
            const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
            mainDisplay = `${Math.max(0, diff)}`
            subDisplay = "DAYS LEFT"
        } else {
            mainDisplay = "--"
            subDisplay = "DAYS LEFT"
        }
    } else {
        mainDisplay = `${data.currentValue}`
        subDisplay = `/ ${data.targetValue}`
    }

    const containerStyle: CSSProperties = {
        width,
        height,
        backgroundColor: '#E0C3FC',
        backgroundColor: '#E0C3FC',
        // CSS Mesh Gradient
        backgroundImage: `
            radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
            radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
            radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Outfit, sans-serif', // Use a rounder font if available, else standard
        position: 'relative',
        overflow: 'hidden'
    }

    return (
        <div style={containerStyle}>
            {/* Glass Overlay Effect */}
            <div style={{
                position: 'absolute',
                inset: '20px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)', // Note: html2canvas might struggle with backdrop-filter.
                // Fallback for html2canvas often needed: simple opacity
                borderRadius: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 1
            }} />

            {/* Content */}
            <div style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
                <h1 style={{
                    fontSize: '40px',
                    fontWeight: 700,
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    {data.title || "AURA"}
                </h1>

                <div style={{
                    fontSize: '200px',
                    fontWeight: 800,
                    lineHeight: 0.9,
                    background: '-webkit-linear-gradient(#fff, #eee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))'
                }}>
                    {mainDisplay}
                </div>

                <div style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    marginTop: '20px',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '10px 30px',
                    borderRadius: '50px',
                    backdropFilter: 'blur(5px)'
                }}>
                    {subDisplay}
                </div>
            </div>

            {/* Watermark */}
            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '80px',
                    zIndex: 10,
                    fontSize: '20px',
                    opacity: 0.7,
                    fontWeight: 500,
                    letterSpacing: '1px'
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
