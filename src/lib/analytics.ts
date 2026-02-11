type AllowedProperty =
    | 'utm_source'
    | 'utm_medium'
    | 'utm_campaign'
    | 'page'
    | 'variant';

type ForbiddenProperty =
    | 'goalTitle'
    | 'goalText'
    | 'targetDate';

type AnalyticsEventProps = {
    [key in AllowedProperty]?: string | number | boolean;
};

// Explicitly define forbidden keys for runtime checking
const FORBIDDEN_KEYS: ForbiddenProperty[] = ['goalTitle', 'goalText', 'targetDate'];

// Whitelist of allowed keys
const ALLOWED_KEYS: AllowedProperty[] = ['utm_source', 'utm_medium', 'utm_campaign', 'page', 'variant'];

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

// Augment window to include gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event',
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

// In-memory store for UTM parameters to carry them through the session
let capturedUtmParams: Partial<AnalyticsEventProps> = {};

export const setUtmParams = (params: Partial<AnalyticsEventProps>) => {
    capturedUtmParams = { ...capturedUtmParams, ...params };
};

export const getUtmParams = () => {
    return capturedUtmParams;
};

export const track = (eventName: string, props?: Record<string, any>) => {
    // 1. Check for forbidden keys (Fail Loudly)
    if (props) {
        for (const key of Object.keys(props)) {
            if (FORBIDDEN_KEYS.includes(key as ForbiddenProperty)) {
                const errorMsg = `[Analytics] CRITICAL ERROR: Attempted to track forbidden property: ${key}. Event: ${eventName}`;
                console.error(errorMsg);
                if (process.env.NODE_ENV === 'development') {
                    throw new Error(errorMsg);
                }
                return; // Don't send event if it contains forbidden data
            }
        }
    }

    // 2. Filter for whitelist keys
    const cleanProps: AnalyticsEventProps = {};

    // Mix in captured UTM params
    const mergedProps = { ...capturedUtmParams, ...props };

    for (const key of Object.keys(mergedProps)) {
        if (ALLOWED_KEYS.includes(key as AllowedProperty)) {
            cleanProps[key as AllowedProperty] = mergedProps[key as AllowedProperty];
        }
    }

    // 3. Send to GA4
    if (typeof window !== 'undefined' && window.gtag && GA4_ID) {
        window.gtag('event', eventName, cleanProps);
    }

    // 4. Log in Development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Tracked: ${eventName}`, cleanProps);
        if (!GA4_ID) {
            console.warn('[Analytics] GA4_ID is missing. Event would not be sent in production.');
        }
    }
};
