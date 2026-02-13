import { TemplateProps } from "@/lib/types"
import { ProgressRing } from "../ProgressRing"

export function MinimalTemplate({ data, width = 1080, height = 1920, scale = 1, watermark }: TemplateProps) {
    // Mobile aspect ratio is key. We scale everything based on width.
    // Base font size = width * 0.06 for better readability
    const baseFontSize = width * 0.06

    return (
        <div
            style={{
                width: width,
                height: height,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                background: "linear-gradient(to bottom, #000000, #1a1a1a)",
                color: "white",
                fontFamily: "Inter, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
            className="flex flex-col items-center justify-center p-12 text-center"
        >
            {/* Dynamic Island Safe Zone (approx 25%) */}
            <div style={{ position: 'absolute', top: '25%', textAlign: 'center', width: '100%', padding: '0 20px', zIndex: 2 }}>
                <h1 style={{ fontSize: baseFontSize * 1.5, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
                    {data.title || "Goal Title"}
                </h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8" style={{ marginTop: '10%' }}>
                {data.mode === 'countdown' ? (
                    <div style={{ fontSize: baseFontSize * 4, fontWeight: 900 }}>
                        {Math.ceil((new Date(data.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                        <span style={{ fontSize: baseFontSize, display: "block", fontWeight: 400, opacity: 0.7 }}>DAYS LEFT</span>
                    </div>
                ) : (
                    <div style={{ position: "relative", width: width * 0.65, height: width * 0.65 }}>
                        {/* Progress Ring — fills container */}
                        <div style={{ position: "absolute", inset: 0 }}>
                            <ProgressRing
                                radius={45}
                                stroke={6} // Relative to 90px viewbox (6/90 = 6.6%) -> fairly thick
                                progress={Math.min(100, (data.currentValue / (data.targetValue || 1)) * 100)}
                                color="white"
                                trackColor="#333"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            <span style={{ fontSize: baseFontSize * 2.5, fontWeight: 900, lineHeight: 1 }}>{Math.round((data.currentValue / (data.targetValue || 1)) * 100)}%</span>
                            <span style={{ fontSize: baseFontSize * 0.8, opacity: 0.7, marginTop: '10px' }}>{data.currentValue} / {data.targetValue}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Safe Zone */}
            <div style={{
                position: 'absolute',
                bottom: '12%',
                opacity: 0.5,
                fontSize: baseFontSize * 0.6,
                letterSpacing: '0.2em',
                fontWeight: 600
            }}>
                KEEP PUNCHING
            </div>

            {watermark && (
                <div style={{
                    position: "absolute",
                    bottom: height * 0.05,
                    opacity: 0.5,
                    fontSize: baseFontSize * 0.4,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "white",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
