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
import { LoginDialog } from "@/components/dialog-login"
import { getCookie } from "@/lib/utils"
import cartApiRequest from '@/apiRequests/cart';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { CartType } from "@/schemaValidations/cart.schema"
import { useRouter } from "next/navigation";
import { paths } from "@/constants/paths"

const AppLayout = ({ children }: any) => {
    const router = useRouter()
    const { user, setUser, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser,
        setIsShowLoginDialog: state.setIsShowLoginDialog,
    }))

    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))
    useEffect(() => {
        const fetchProfile = async () => {
            const accessToken = getCookie('accessToken');
            if (user === undefined && accessToken) {
                const result = await accountApiRequest.profile();
                const { status, payload } = result;
                if (status === 200) {
                    const data = (payload as any)?.data as TypeDataAccountRes;
                    setUser(data);
                }
            }
        }

        const fetchCart = async () => {
            if (user) {
                const response = await cartApiRequest.getCart();
                console.log({ response });
                const { payload, status } = response as any;
                if (status === 200) {
                    const data = (payload as any)?.data as CartType;
                    setCart(data);
                }
            }
        }

        fetchProfile().then(() => {
            fetchCart();
        });
    }, [user])

    const onClick = () => {
        if (user) {
            router.push(paths.cart);
        } else {
            setIsShowLoginDialog(true);
        }
    }

    return (
        <>
            <LoginDialog />
            <div className="flex flex-col min-h-screen min-w-full">
                <header className="header-height z-50 sticky top-0 flex items-center gap-4 border-b bg-background px-4 md:px-6">
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        {user && <UserNav user={user} />}
                        <CartIcon number={cart && cart?.details?.length} onClick={onClick} />
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
        </>
    )
}

export default AppLayout