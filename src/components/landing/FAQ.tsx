export function FAQ() {
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-foreground">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        <div className="pt-6">
                            <dt>
                                <span className="text-base font-semibold leading-7 text-foreground">Do I need later updates?</span>
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                Nope. This isn't a subscription. You pay once for the pack, or use the free version. Come back whenever you want to generate a new update.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt>
                                <span className="text-base font-semibold leading-7 text-foreground">Does it work on Android?</span>
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                Yes! We generate 3 common Android sizes and 3 iPhone sizes. If your phone crops, just choose the closest size from the pack.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt>
                                <span className="text-base font-semibold leading-7 text-foreground">How do I access my downloads?</span>
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                Downloads start immediately after purchase/generation.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
