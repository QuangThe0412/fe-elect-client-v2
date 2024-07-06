import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import { TypeDataAccountRes } from "@/schemaValidations/account.schema"
import accountApiRequest from "@/apiRequests/account"
import { useEffect } from "react"

const AppLayout = ({ children }: any) => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser,
        isAuthenticated: state.isAuthenticated,
        setIsAuthenticated: state.setIsAuthenticated,
    }))
    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) {
                const result = await accountApiRequest.profile();
                const { status, payload } = result;
                if (status === 200 && payload.status === 200) {
                    const data = payload.data;
                    setUser(data as TypeDataAccountRes);
                    setIsAuthenticated(true);
                }
            }
        }

        fetchProfile();
    }, [isAuthenticated, user])

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    {isAuthenticated && <UserNav user={user} />}
                </div>
                <ModeToggle />
            </header>
            {children}
        </div>
    )
}

export default AppLayout