"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Check } from "lucide-react"
import { PunchMinimal } from "@/components/generator/templates/PunchMinimal"
import { WallpaperData } from "@/lib/types"
import { track } from "@/lib/analytics"

const today = new Date()
const target = new Date(today)
target.setDate(today.getDate() + 400) // Always show significant progress left

const MOCK_DATA: WallpaperData = {
    mode: 'progress',
    title: '30 Workouts',
    targetDate: target.toISOString().split('T')[0],
    currentValue: 12,
    targetValue: 30,
    templateId: 'punch-minimal'
}

export function Hero() {
    const scrollToGenerator = () => {
        track('cta_get_started_clicked', { variant: 'hero' })
        // Scroll to /app if on same page, or link? 
        // Current implementation was scroll to #generator.
        // But user wants "/app". 
        // Let's change this to Link to /app
        window.location.href = "/app"
    }

    return (
        <div className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Turn your goals into <span className="text-primary">punch cards</span> on your lock screen.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Every time you check your phone, you punch your card.
                            Simple, satisfying, and impossible to ignore.
                            No apps to open. Just progress.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Button onClick={scrollToGenerator} size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20">
                                Create your punch card <ArrowDown className="ml-2 h-4 w-4" />
                            </Button>
                            <a href="#features" className="text-sm font-semibold leading-6 text-foreground">
                                How it works <span aria-hidden="true">→</span>
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No Subscription</div>
                            <div className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> Digital Punch Card</div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/10" style={{ width: 280, height: 600, background: '#18181b' }}>
                                    <PunchMinimal
                                        data={MOCK_DATA}
                                        width={280}
                                        height={600}
                                    // scale logic handled inside? No, PunchMinimal doesn't accept scale. 
                                    // It accepts width/height.
                                    // But PunchCardGrid might need scaling if container is small?
                                    // PunchMinimal layout is flex column. 
                                    // It uses explicit pixels?
                                    // Let's check PunchMinimal.
                                    // It uses style={{ transform: 'scale(1.5)' }} for the grid.
                                    // And width/height for container.
                                    // Should be okay.
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
