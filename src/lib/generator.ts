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
    const root = zip.folder(folderName)

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png")
    })

    if (blob && root) {
        // Story (Universal)
        root.file("story-1080x1920.png", blob)

        // iPhone Pack (3 common sizes)
        const iphone = root.folder("iphone")
        iphone?.file("iphone-1290x2796.png", blob)
        iphone?.file("iphone-1170x2532.png", blob)
        iphone?.file("iphone-1284x2778.png", blob)

        // Android Pack (3 common sizes)
        const android = root.folder("android")
        android?.file("android-1080x2400.png", blob)
        android?.file("android-1440x3088.png", blob)
        android?.file("android-1440x3200.png", blob)
    }

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
