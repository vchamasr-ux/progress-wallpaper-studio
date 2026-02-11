import html2canvas from "html2canvas"
import JSZip from "jszip"
import { WallpaperData } from "@/lib/types"

export async function generateAndDownloadPack(data: WallpaperData) {
    const element = document.getElementById("capture-base")
    if (!element) {
        throw new Error("Capture element not found")
    }

    // 1. Generate base canvas (Story/HD)
    const canvas = await html2canvas(element, {
        scale: 1, // 1080x1920
        useCORS: true,
        backgroundColor: null,
    })

    // 2. Create ZIP
    const zip = new JSZip()
    const folderName = `progress-wallpaper-${data.mode}`
    const folder = zip.folder(folderName)

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png")
    })

    // Add files for V0 (just duplicates/renamed for convenience for now, or real resizes if needed)
    // Story
    folder?.file("story-lockscreen.png", blob)

    // iPhone (resize or just use same high res)
    folder?.file("iphone-wallpaper.png", blob)

    // Android
    folder?.file("android-wallpaper.png", blob)

    // 3. Generate and Download
    const zipContent = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(zipContent)

    const link = document.createElement("a")
    link.href = url
    link.download = `${folderName}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
