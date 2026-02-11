import html2canvas from "html2canvas"
import JSZip from "jszip"
import { WallpaperData } from "@/lib/types"

export type ExportTarget = 'iphone' | 'android' | 'story'

export async function generateExport(data: WallpaperData, target: ExportTarget) {
    const element = document.getElementById("capture-base")
    if (!element) {
        throw new Error("Capture element not found")
    }

    // 1. Generate base canvas (1080x1920)
    const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
    })

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png")
    })

    if (!blob) throw new Error("Failed to generate image blob")

    const zip = new JSZip()
    const folderName = `progress-wallpaper-${data.mode}`
    let downloadUrl = ""
    let downloadFilename = ""

    if (target === 'story') {
        // Direct PNG download
        downloadUrl = URL.createObjectURL(blob)
        downloadFilename = `${folderName}-story-1080x1920.png`
    } else {
        // ZIP Archives
        const root = zip.folder(folderName)

        if (target === 'iphone') {
            // 3 common sizes encoded in filename
            root?.file(`iphone-1290x2796.png`, blob) // Pro Max
            root?.file(`iphone-1170x2532.png`, blob) // Pro
            root?.file(`iphone-1284x2778.png`, blob) // Plus
        } else if (target === 'android') {
            root?.file(`android-1080x2400.png`, blob)
            root?.file(`android-1440x3088.png`, blob)
            root?.file(`android-1440x3200.png`, blob)
        }

        const zipContent = await zip.generateAsync({ type: "blob" })
        downloadUrl = URL.createObjectURL(zipContent)
        downloadFilename = `${folderName}-${target}.zip`
    }

    // Trigger Download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl)
}
