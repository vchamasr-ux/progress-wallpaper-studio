import { Check, Download, Smartphone, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DownloadHub({ onDownload }: { onDownload: () => void }) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-lg">Export Center</h3>
                        <p className="text-sm text-muted-foreground">Your pack is ready.</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Paid & Unlocked
                    </div>
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="text-sm font-medium">iPhone Pack</div>
                                <div className="text-xs text-muted-foreground">3 sizes (PNG)</div>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={onDownload}>Download</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="text-sm font-medium">Android Pack</div>
                                <div className="text-xs text-muted-foreground">3 sizes (PNG)</div>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={onDownload}>Download</Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="text-sm font-medium">Story Share</div>
                                <div className="text-xs text-muted-foreground">1080x1920 (PNG)</div>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={onDownload}>Download</Button>
                    </div>
                </div>

                <Button className="w-full gap-2" size="lg" onClick={onDownload}>
                    <Download className="w-4 h-4" /> Download Full Pack (ZIP)
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                    Includes all sizes. Unzip to view.
                </p>
            </div>
        </div>
    )
}
