"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Check } from "lucide-react"
import { MinimalTemplate } from "@/components/generator/templates/MinimalTemplate"
import { WallpaperData } from "@/lib/types"

const MOCK_DATA: WallpaperData = {
    mode: 'countdown',
    title: 'Bali Trip',
    targetDate: '2024-12-31',
    currentValue: 0,
    targetValue: 100,
    templateId: 'minimal'
}

export function Hero() {
    const scrollToGenerator = () => {
        const element = document.getElementById("generator")
        element?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">
                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Turn your goals into <span className="text-primary">lock screen</span> wallpapers.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Zero app fatigue. No accounts. Update your goal, generate a pack, and set it as your wallpaper.
                            Keeps your progress visible 100 times a day.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Button onClick={scrollToGenerator} size="lg" className="h-14 px-8 text-lg rounded-full">
                                Generate yours now <ArrowDown className="ml-2 h-4 w-4" />
                            </Button>
                            <a href="#features" className="text-sm font-semibold leading-6 text-foreground">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No Subscription</div>
                            <div className="flex items-center gap-1"><Check className="h-4 w-4 text-green-500" /> No Account Needed</div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-900/10" style={{ width: 280, height: 600, background: 'black' }}>
                                    <MinimalTemplate
                                        data={MOCK_DATA}
                                        width={280}
                                        height={600}
                                        scale={1}
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
