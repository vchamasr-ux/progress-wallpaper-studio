
export function Footer() {
    return (
        <footer className="bg-muted py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; 2024 Progress Wallpaper Studio. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    <a href="#" className="hover:text-foreground">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
