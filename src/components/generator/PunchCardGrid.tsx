import React from "react"
import { cn } from "@/lib/utils"

interface PunchCardGridProps {
    total: number
    filled: number
    color?: string
    emptyColor?: string
    shape?: 'circle' | 'square' | 'rounded'
}

export function PunchCardGrid({
    total,
    filled,
    color = "bg-primary",
    emptyColor = "bg-muted/30",
    shape = 'circle'
}: PunchCardGridProps) {

    // Safety cap to prevent rendering thousands of nodes
    const SAFE_TOTAL = Math.min(Math.max(1, total), 365)
    const isOverLimit = total > 60

    // Grid calculation
    // We want a nice aspect ratio approx 4-5 cols wide usually
    const columns = total <= 15 ? 3 : total <= 30 ? 5 : 6

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                }}
            >
                {Array.from({ length: SAFE_TOTAL }).map((_, i) => {
                    const isFilled = i < filled
                    return (
                        <div
                            key={i}
                            className={cn(
                                "w-6 h-6 transition-all border-2",
                                shape === 'circle' && "rounded-full",
                                shape === 'rounded' && "rounded-md",
                                shape === 'square' && "rounded-none",
                                isFilled
                                    ? cn(color, "border-transparent scale-100")
                                    : cn(emptyColor, "border-muted-foreground/20 scale-90")
                            )}
                        />
                    )
                })}
            </div>
            {isOverLimit && (
                <div className="text-[10px] opacity-70 mt-2 font-mono">
                    * Grid optimized for &lt;60. Current: {total}
                </div>
            )}
        </div>
    )
}
