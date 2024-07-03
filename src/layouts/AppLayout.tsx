import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { ModeToggle } from "@/components/mode-toggle"

const AppLayout = ({ children }: any) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    <UserNav />
                </div>
                <ModeToggle />
            </header>
            {children}
        </div>
    )
}

export default AppLayout