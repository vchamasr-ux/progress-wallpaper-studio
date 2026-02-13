import { CSSProperties } from "react"

interface ProgressRingProps {
    radius?: number
    stroke?: number
    progress: number
    color?: string
    trackColor?: string
    style?: CSSProperties
}

export function ProgressRing({
    radius = 45,
    stroke = 10,
    progress,
    color = "white",
    trackColor = "#333",
    style
}: ProgressRingProps) {
    const normalizedRadius = radius - stroke * 0.5
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progress / 100) * circumference

    // When style is provided (e.g. width: 100%, height: 100%), don't set fixed
    // HTML width/height attributes — the viewBox handles internal coordinates
    // and CSS handles actual sizing.
    const sizeProps = style
        ? {}
        : { height: radius * 2, width: radius * 2 }

    return (
        <svg
            {...sizeProps}
            style={{ transform: "rotate(-90deg)", ...style }}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
            <circle
                stroke={trackColor}
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    )
}
