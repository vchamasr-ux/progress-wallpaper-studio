import { WallpaperData } from "@/lib/types"
import { getThemeById } from "@/lib/themes"
import { PunchCardGrid } from "@/components/generator/PunchCardGrid"

interface PunchCardTemplateProps {
    data: WallpaperData
    width: number
    height: number
    scale?: number
    watermark?: boolean
}

export function PunchCardTemplate({ data, width, height, scale, watermark }: PunchCardTemplateProps) {
    const theme = getThemeById(data.themeId || "miami-neon")

    const containerStyle: React.CSSProperties = {
        width,
        height,
        background: theme.backgroundGradient || theme.background,
        color: theme.textColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: theme.fontFamily || "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        ...(scale ? { transform: `scale(${scale})`, transformOrigin: 'top left' } : {}),
    }

    const pct = data.targetValue > 0
        ? Math.round((data.currentValue / data.targetValue) * 100)
        : 0

    return (
        <div style={containerStyle}>
            {/* Grain overlay */}
            {theme.grain && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                    pointerEvents: 'none',
                    zIndex: 1,
                }} />
            )}

            {/* Title — safe zone top 15% */}
            <div style={{
                position: 'absolute',
                top: '15%',
                textAlign: 'center',
                zIndex: 2,
                padding: '0 60px',
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    textShadow: theme.glow
                        ? `0 0 20px ${theme.punchFilled}40`
                        : '0 2px 4px rgba(0,0,0,0.15)',
                    margin: 0,
                }}>
                    {data.title || "MY GOAL"}
                </h1>
                <p style={{
                    fontSize: '1.4rem',
                    opacity: 0.6,
                    marginTop: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                }}>
                    {data.currentValue} / {data.targetValue}
                </p>
            </div>

            {/* Punch Card Grid — center */}
            <div style={{ transform: 'scale(1.5)', zIndex: 2 }}>
                <PunchCardGrid
                    total={data.targetValue}
                    filled={data.currentValue}
                    filledColor={theme.punchFilled}
                    emptyColor={theme.punchEmpty}
                    glow={theme.glow}
                    shape="circle"
                />
            </div>

            {/* Footer — safe zone bottom 15% */}
            <div style={{
                position: 'absolute',
                bottom: '15%',
                textAlign: 'center',
                zIndex: 2,
            }}>
                <div style={{
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: theme.accent,
                }}>
                    {pct}% COMPLETE
                </div>
            </div>

            {/* Watermark */}
            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    fontSize: '14px',
                    opacity: 0.4,
                    zIndex: 3,
                    letterSpacing: '0.05em',
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
