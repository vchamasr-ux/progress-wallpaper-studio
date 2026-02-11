import { ArrowRight } from "lucide-react"

const steps = [
    {
        id: 1,
        title: 'Enter your goal',
        description: 'Choose a countdown date or a progress tracker (e.g. 5/10 workouts).',
    },
    {
        id: 2,
        title: 'Pick a style',
        description: 'Select from clean, bold, or neon templates designed for lock screens.',
    },
    {
        id: 3,
        title: 'Download pack',
        description: 'Get instant high-res wallpapers for iPhone, Android, and Stories.',
    },
]

export function HowItWorks() {
    return (
        <div className="bg-background py-16 sm:py-24 border-b">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How it works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Three simple steps to focus.</p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {steps.map((step, stepIdx) => (
                        <div key={step.title} >
                            <div className="flex items-center text-sm font-semibold leading-6 text-primary">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 mr-3">
                                    {step.id}
                                </span>
                                Step {step.id}
                            </div>
                            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-foreground">
                                {step.title}
                            </h3>
                            <p className="mt-1 text-base leading-7 text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
