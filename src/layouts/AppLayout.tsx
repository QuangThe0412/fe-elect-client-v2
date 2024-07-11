import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search } from "@/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import accountApiRequest from "@/apiRequests/account"
import { useEffect } from "react"
import { TypeDataAccountRes } from "@/schemaValidations/account.schema"
import "@/styles/layout.css"
import CartIcon from "@/components/cart"

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
                if (status === 200) {
                    const data = (payload as any)?.data as TypeDataAccountRes;
                    setUser(data);
                    setIsAuthenticated(true);
                }
            }
        }

        fetchProfile();
    }, [isAuthenticated, user])

    return (
        <div className="flex flex-col min-h-screen min-w-full">
            <header className="header-height z-50 sticky top-0 flex items-center gap-4 border-b bg-background px-4 md:px-6">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <Search />
                    {isAuthenticated && <UserNav user={user} />}
                    <CartIcon />
                </div>
            </header>
            <div className="overflow-hidden body-height">
                {children}
            </div>
            <footer className="footer-height bg-background border-t">
                <div className="flex justify-center items-center h-full">
                    <ModeToggle />
                    <p className="text-sm text-gray-400">© 2021</p>
                </div>
            </footer>
        </div>
    )
}

export default AppLayout