"use client";
import React from 'react'
import { Button } from './ui/button';
import { BsCart } from 'react-icons/bs';
import useAuthStore, { TypeUsers } from '@/store/auth.store';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import cartApiRequest from '@/apiRequests/cart';
import { CartDetails, CartType } from '@/schemaValidations/cart.schema';

const ButtonAddCart = ({ id }: { id: number }) => {
    const [loading, setLoading] = React.useState(false);
    const { user, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    const IDHoaDon = cart?.IDHoaDon;

    const hadUser = !!(user && Object.keys(user).length);

    const handleAddToCart = async (idMon: number | undefined) => {
        setLoading(true);
        if (!hadUser) {
            setIsShowLoginDialog(true);
        } else {
            if (IDHoaDon) {
                const response = await cartApiRequest.addToCart({ IDHoaDon, IDMon: idMon, SoLuong: 1 });
                const { payload, status } = response as any;
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
                const response = await cartApiRequest.addToCart({ IDMon: idMon, SoLuong: 1 });
                const { payload, status } = response as any;
                if (status === 200) {
                    const newCartGet = await cartApiRequest.getCart();
                    const { payload, status } = newCartGet as any;
                    if (status === 200) {
                        const data = payload?.data as CartType;
                        setCart(data);
                    }
                }
            }
        }
        setLoading(false);
    }

    return (
        <div className='block text-right'>
            <Button loading={loading}
                onClick={() => handleAddToCart(id)}
                className="bg-accent text-white px-4 py-2 rounded-lg">
                <BsCart size={20} />
            </Button>
        </div>
    )
}

export default ButtonAddCart