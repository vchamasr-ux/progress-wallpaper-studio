import { WallpaperData } from "@/lib/types"
import { ProgressRing } from "../ProgressRing"
import { CSSProperties } from "react"

export function GlitchTemplate({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
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
            subDisplay = "DAYS_LEFT"
        } else {
            mainDisplay = "ERR"
            subDisplay = "NO_SIGNAL"
        }
    } else {
        mainDisplay = `${data.currentValue}`
        subDisplay = `// ${data.targetValue}`
    }

    const containerStyle: CSSProperties = {
        width,
        height,
        backgroundColor: '#050505',
        backgroundImage: `
            linear-gradient(transparent 50%, rgba(0, 255, 0, 0.02) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))
        `,
        backgroundSize: '100% 4px, 6px 100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00ff41', // Matrix Green
        fontFamily: 'Courier New, monospace',
        position: 'relative',
        overflow: 'hidden'
    }

    return (
        <div style={containerStyle}>
            {/* Scanlines / Noise */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)',
                opacity: 0.1,
                pointerEvents: 'none'
            }} />

            {/* Content */}
            <div style={{ textAlign: 'left', zIndex: 10, width: '80%' }}>
                <div style={{
                    borderBottom: '4px solid #00ff41',
                    paddingBottom: '20px',
                    marginBottom: '40px'
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '-1px'
                    }}>
                        {">"} {data.title || "SYSTEM_GOAL"}
                    </h1>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    {!isCountdown && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: width * 0.7, height: width * 0.7, opacity: 0.3, zIndex: -1 }}>
                            <ProgressRing
                                radius={45}
                                stroke={2}
                                progress={Math.min(100, Math.max(0, (data.currentValue / (data.targetValue || 1)) * 100))}
                                color="#00ff41"
                                trackColor="rgba(0, 255, 65, 0.1)"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    )}
                    <div style={{
                        fontSize: '220px',
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: '-10px',
                        textShadow: '4px 4px 0px rgba(255,0,0,0.5), -4px -4px 0px rgba(0,0,255,0.5)',
                        marginLeft: '-10px'
                    }}>
                        {mainDisplay}
                    </div>
                </div>

                <div style={{
                    fontSize: '40px',
                    fontWeight: 700,
                    marginTop: '10px',
                    opacity: 0.8
                }}>
                    {subDisplay}
                    <span className="animate-pulse">_</span>
                </div>

                {/* Decorative Code */}
                <div style={{
                    marginTop: '60px',
                    fontSize: '18px',
                    opacity: 0.5,
                    lineHeight: 1.5
                }}>
                    <div>STATUS: ACTIVE</div>
                    <div>MEM: 64KB OK</div>
                    <div>EXECUTE: {data.mode.toUpperCase()}</div>
                </div>
            </div>

            {/* Watermark */}
            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    right: '50px',
                    fontSize: '20px',
                    opacity: 0.6,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    border: '2px solid #00ff41',
                    padding: '5px 10px',
                    transform: 'rotate(-5deg)'
                }}>
                    PWS_DEMO
                </div>
            )}
        </div>
    )
}
