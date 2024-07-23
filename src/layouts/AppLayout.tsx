import useAuthStore, { TypeUsers } from '@/store/auth.store'
import accountApiRequest from "@/apiRequests/account"
import { useEffect } from "react"
import { TypeDataAccountRes } from "@/schemaValidations/account.schema"
import "@/styles/layout.css"
import { LoginDialog } from "@/components/dialog-login"
import { tryGetAccessToken } from "@/lib/utils"
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
        const init = async () => {
            const accessToken = await tryGetAccessToken() as string;

            if (accessToken) {
                await fetchProfile(accessToken);
                await fetchCart(accessToken);
            }
        };

        const fetchProfile = async (accessToken: string) => {
            if (!hadUser) {
                const result = await accountApiRequest.profile(accessToken);
                const { status, payload } = result;
                if (status === 200) {
                    const data = (payload as any)?.data as TypeDataAccountRes;
                    setUser(data);
                }
            }
        };

        const fetchCart = async (accessToken: string) => {
            const response = await cartApiRequest.getCart(accessToken); 
            const { payload, status } = response;
            if (status === 200) {
                const data = (payload as any)?.data as CartType;
                setCart(data);
            }
        };

        init();
    }, [user]);

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