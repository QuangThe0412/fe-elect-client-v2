import useAuthStore, { TypeUsers } from '@/store/auth.store'
import accountApiRequest from "@/apiRequests/account"
import { useEffect } from "react"
import { TypeDataAccountRes } from "@/schemaValidations/account.schema"
import "@/styles/layout.css"
import { LoginDialog } from "@/components/dialog-login"
import { getCookie } from "@/lib/utils"
import cartApiRequest from '@/apiRequests/cart';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { CartType } from "@/schemaValidations/cart.schema"
import HeaderMain from "@/components/header-main"
import Navbar from "@/components/nav-bar"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MobileNavBar from "@/components/mobile-navbar"
import Footer from "@/components/footer"
import HeaderTop from "@/components/header-top"

const AppLayout = ({ children }: any) => {
    const { user, setUser } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setUser: state.setUser,
    }))
    const hadUser = !!(user && Object.keys(user).length);

    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const fetchProfile = async () => {
            if (!hadUser && accessToken) {
                const result = await accountApiRequest.profile();
                const { status, payload } = result;
                if (status === 200) {
                    const data = (payload as any)?.data as TypeDataAccountRes;
                    setUser(data);
                }
            }
        }

        const fetchCart = async () => {
            if (accessToken) {
                const response = await cartApiRequest.getCart();
                const { payload, status } = response as any;
                if (status === 200) {
                    const data = payload?.data as CartType;
                    setCart(data);
                }
            }
        }

        fetchProfile()
        fetchCart();
    }, [user])

    return (
        <>
            <HeaderTop />
            <HeaderMain number={cart && cart?.details?.length} />
            <Navbar />
            <LoginDialog />
            <MobileNavBar />
            <div className="overflow-hidden">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default AppLayout