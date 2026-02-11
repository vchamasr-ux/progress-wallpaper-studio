"use client"

import { AppContainer } from "@/components/app/AppContainer"
import { useEffect } from "react"
import { track } from "@/lib/analytics"

export default function AppPage() {
    useEffect(() => {
        track('app_view')
    }, [])

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <AppContainer />
        </main>
    )
}

