type EventName = 'landing_view' | 'generate_clicked' | 'download_orig_clicked' | 'checkout_started' | 'checkout_success' | 'download_pro_clicked';

export function trackEvent(name: EventName, properties?: Record<string, any>) {
    // 1. PostHog / Analytics abstraction
    if (typeof window !== 'undefined') {
        // Example: if configured
        if ((window as any).posthog) {
            (window as any).posthog.capture(name, properties);
        }
    }

    // 2. Dev logging
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${name}`, properties);
    }
}
