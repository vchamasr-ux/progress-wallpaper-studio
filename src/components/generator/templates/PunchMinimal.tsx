import { WallpaperData } from "@/lib/types"
import { PunchCardGrid } from "@/components/generator/PunchCardGrid"
import { CSSProperties } from "react"

export function PunchMinimal({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
    // Determine colors based on "Minimal" theme (Monochrome)

    return (
        <div style={{
            width,
            height,
            backgroundColor: '#18181b', // Zinc-950
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            position: 'relative'
        }}>
            {/* Safe Zone Top */}
            <div style={{ position: 'absolute', top: '15%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
                    {data.title || "GOAL"}
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.5, marginTop: '0.5rem' }}>
                    {data.currentValue} / {data.targetValue}
                </p>
            </div>

            {/* Grid */}
            <div style={{ transform: 'scale(1.5)' }}>
                <PunchCardGrid
                    total={data.targetValue}
                    filled={data.currentValue}
                    color="bg-white"
                    emptyColor="bg-zinc-800"
                    shape="circle"
                />
            </div>

            {/* Quote / Footer */}
            <div style={{ position: 'absolute', bottom: '15%', opacity: 0.5, fontSize: '1rem' }}>
                KEEP PUNCHING
            </div>

            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    fontSize: '14px',
                    opacity: 0.4
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
