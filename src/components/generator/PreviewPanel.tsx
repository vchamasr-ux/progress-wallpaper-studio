import { WallpaperData } from "@/lib/types"
import { MinimalTemplate } from "./templates/MinimalTemplate"

interface PreviewPanelProps {
    data: WallpaperData
    customTemplate?: React.ComponentType<any>
    watermark?: boolean
}

export function PreviewPanel({ data, customTemplate: CustomTemplate, watermark }: PreviewPanelProps) {
    // Mobile standard is ~360px wide in preview
    const PREVIEW_WIDTH = 300
    const PREVIEW_HEIGHT = (300 * 16) / 9 // ~533
    // Real render is 1080x1920
    const SCALE = PREVIEW_WIDTH / 1080

    return (
        <div className="relative mx-auto h-[600px] w-[340px] rounded-[3rem] border-8 border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden ring-4 ring-zinc-200/20">
            <div className="absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-zinc-900 z-50"></div>

            <div style={{
                width: PREVIEW_WIDTH,
                height: PREVIEW_HEIGHT,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden',
                borderRadius: '2rem'
            }}>
                {/* Template Rendering */}
                {CustomTemplate ? (
                    <CustomTemplate data={data} width={1080} height={1920} scale={SCALE} watermark={watermark} />
                ) : (
                    <MinimalTemplate data={data} width={1080} height={1920} scale={SCALE} watermark={watermark} />
                )}
            </div>

            {/* Overlay for time/date simulation (optional) */}
            <div className="absolute top-12 w-full text-center text-white/50 z-20 pointer-events-none select-none">
                <div className="text-5xl font-thin tracking-tighter">09:41</div>
                <div className="text-lg font-medium">Monday, June 3</div>
            </div>
        </div>
    )
}
