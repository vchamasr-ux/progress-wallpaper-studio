import { WallpaperData } from "@/lib/types"
import { MinimalTemplate } from "./templates/MinimalTemplate"

interface HiddenRendererProps {
    data: WallpaperData
    exportRef: React.RefObject<HTMLDivElement>
}

export function HiddenRenderer({ data, exportRef }: HiddenRendererProps) {
    // We render at 1080x1920 base. The export logic can scale the canvas if needed, 
    // or we can just ship 1080p for V0 simplicity.
    return (
        <div className="fixed left-[-9999px] top-0 overflow-hidden">
            <div ref={exportRef} id="export-container">
                {/* We can render multiple variants here if we want to snap them all at once, 
             or just snap one base and resize (which is faster/cheaper for V0) */}

                {/* Base Story/Phone Version */}
                <div id="capture-base">
                    <MinimalTemplate data={data} width={1080} height={1920} />
                </div>
            </div>
        </div>
    )
}
