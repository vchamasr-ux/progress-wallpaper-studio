import React from "react"

interface PunchCardGridProps {
    total: number
    filled: number
    filledColor: string   // hex, e.g. "#00E5FF"
    emptyColor: string    // rgba, e.g. "rgba(255,255,255,0.18)"
    glow?: string         // CSS box-shadow, e.g. "0 0 8px rgba(0,229,255,0.6)"
    shape?: 'circle' | 'square' | 'rounded'
}

export function PunchCardGrid({
    total,
    filled,
    filledColor,
    emptyColor,
    glow,
    shape = 'circle'
}: PunchCardGridProps) {

    // Safety cap to prevent rendering thousands of nodes
    const SAFE_TOTAL = Math.min(Math.max(1, total), 365)
    const isOverLimit = total > 60

    // Grid calculation – nice aspect ratio
    const columns = total <= 15 ? 3 : total <= 30 ? 5 : total <= 50 ? 6 : 7

    const borderRadius =
        shape === 'circle' ? '50%' :
            shape === 'rounded' ? '6px' :
                '0px'

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
                style={{
                    display: 'grid',
                    gap: '12px',
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                }}
            >
                {Array.from({ length: SAFE_TOTAL }).map((_, i) => {
                    const isFilled = i < filled
                    return (
                        <div
                            key={i}
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius,
                                backgroundColor: isFilled ? filledColor : emptyColor,
                                boxShadow: isFilled && glow ? glow : 'none',
                                transform: isFilled ? 'scale(1)' : 'scale(0.85)',
                                transition: 'all 0.2s ease',
                                border: isFilled ? 'none' : '2px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    )
                })}
            </div>
            {isOverLimit && (
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '8px', fontFamily: 'monospace' }}>
                    * Grid optimized for &lt;60. Current: {total}
                </div>
            )}
        </div>
    )
}
