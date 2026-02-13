import { WallpaperData } from "@/lib/types"
import { PunchCardGrid } from "@/components/generator/PunchCardGrid"
import { CSSProperties } from "react"

export function PunchNeon({ data, width, height, watermark }: { data: WallpaperData, width: number, height: number, watermark?: boolean }) {
    return (
        <div style={{
            width,
            height,
            backgroundColor: '#09090b',
            color: '#d946ef', // Fuchsia
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            position: 'relative',
            // Subtle grid bg
            backgroundImage: 'radial-gradient(#d946ef 1px, transparent 0)',
            backgroundSize: '40px 40px'
        }}>
            <div style={{ position: 'absolute', top: '15%', textAlign: 'center', background: '#000', padding: '10px 20px', border: '2px solid #d946ef', boxShadow: '4px 4px 0 #d946ef' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {data.title || "NEON_GOAL"}
                </h1>
            </div>

            <div style={{ transform: 'scale(1.6)' }}>
                <PunchCardGrid
                    total={data.targetValue}
                    filled={data.currentValue}
                    filledColor="#d946ef"
                    emptyColor="rgba(39,39,42,1)"
                    glow="0 0 10px rgba(217,70,239,0.8)"

                    shape="square"
                />
            </div>

            <div style={{ position: 'absolute', bottom: '15%', fontSize: '1.5rem', fontWeight: 700 }}>
                {Math.round((data.currentValue / data.targetValue) * 100)}% COMPLETE
            </div>

            {watermark && (
                <div style={{
                    position: 'absolute',
                    bottom: '50px',
                    fontSize: '14px',
                    opacity: 1,
                    color: '#d946ef',
                    background: '#000'
                }}>
                    PWS.EXE
                </div>
            )}
        </div>
    )
}
