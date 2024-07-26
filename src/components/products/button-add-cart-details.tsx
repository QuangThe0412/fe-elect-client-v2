"use client";
import cartApiRequest from '@/apiRequests/cart';
import { Button } from '@/components/ui/button'
import { ResponsePayloadType } from '@/lib/http';
import { CartDetails, CartType } from '@/schemaValidations/cart.schema';
import useAuthStore, { TypeUsers } from '@/store/auth.store';
import useCartStore, { TypeCartStore } from '@/store/cart.store';

const ButtonAddCartPageDetails = ({ idProduct }: { idProduct: number }) => {
    const { user, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    const { cart, setCart, loadingCart, setLoadingCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
        loadingCart: state.loadingCart,
        setLoadingCart: state.setLoadingCart
    }))

    const IDHoaDon = cart?.IDHoaDon;

    const hadUser = !!(user && Object.keys(user).length);

    const HandleAddCart = async (id: number) => {
        setLoadingCart(true);
        if (!hadUser) {
            setIsShowLoginDialog(true);
        } else {
            if (IDHoaDon) {
                const response = await cartApiRequest.addToCart({ IDHoaDon, IDMon: idProduct, SoLuong: 1 });
                const { payload, status } = response as ResponsePayloadType;
                if (status === 200) {
                    const data = payload?.data as CartDetails[];
                    const updatedCartDetails = [...(cart?.details || [])];

                    data.forEach((dataItem) => {
                        const index = updatedCartDetails.findIndex(cartItem => cartItem.IDMon === dataItem.IDMon);
                        if (index > -1) {
                            updatedCartDetails[index] = { ...updatedCartDetails[index], ...dataItem };
                        } else {
                            updatedCartDetails.push(dataItem);
                        }
                    });
                    setCart({ ...cart, details: updatedCartDetails });
                }
            } else {
                const response = await cartApiRequest.addToCart({ IDMon: idProduct, SoLuong: 1 });
                const { payload, status } = response as ResponsePayloadType;
                if (status === 200) {
                    const newCartGet = await cartApiRequest.getCart();
                    const { payload, status } = newCartGet as ResponsePayloadType;
                    if (status === 200) {
                        const data = payload?.data as CartType;
                        setCart(data);
                    }
                }
            }
        }
        setLoadingCart(false);
    }

    return (
        <Button loading={loadingCart} className='btn btn-primary mt-4'
            onClick={() => HandleAddCart(idProduct)}>
            Thêm vào giỏ hàng
        </Button>
    )
}

export default ButtonAddCartPageDetails