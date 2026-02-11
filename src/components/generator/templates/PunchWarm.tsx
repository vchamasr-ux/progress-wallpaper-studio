import { WallpaperData } from "@/lib/types"
import { PunchCardGrid } from "@/components/generator/PunchCardGrid"
import { CSSProperties } from "react"

export function PunchWarm({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
    return (
        <div style={{
            width,
            height,
            background: 'linear-gradient(to bottom right, #fca5a5, #fcd34d)', // Red-300 to Amber-300
            color: '#78350f', // Amber-900
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', top: '18%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {data.title || "DREAM"}
                </h1>
            </div>

            <div style={{ transform: 'scale(1.5)', background: 'rgba(255,255,255,0.2)', padding: '40px', borderRadius: '30px' }}>
                <PunchCardGrid
                    total={data.targetValue}
                    filled={data.currentValue}
                    color="bg-white"
                    emptyColor="bg-white/30"
                    shape="rounded"
                />
            </div>

            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    fontSize: '14px',
                    opacity: 0.6,
                    color: '#fff'
                }}>
                    Progress Wallpaper Studio
                </div>
            )}
        </div>
    )
}
