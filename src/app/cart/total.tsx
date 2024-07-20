import cartApiRequest from '@/apiRequests/cart';
import { AlertDialogCustom } from '@/components/dialog-alert';
import { Button } from '@/components/ui/button';
import { paths } from '@/lib/paths';
import { STATUS_ENUM } from '@/constants/status';
import { formatCurrency } from '@/lib/utils';
import { CartType } from '@/schemaValidations/cart.schema';
import useAuthStore, { TypeUsers } from '@/store/auth.store';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function TotalCart() {
    const router = useRouter();
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
    }))
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    const details = cart?.details ?? [];
    const totalBefore = details.reduce((acc, item) => acc + (item.TienChuaCK ?? 0), 0);
    const totalAfter = details.reduce((acc, item) => acc + (item.TienSauCK ?? 0), 0);
    const totalDiscount = details.reduce((acc, item) => acc + (item.TienCK ?? 0), 0);

    const disablePayment = loading || !cart?.IDHoaDon;

    const onClickPayment = async () => {
        setLoading(true);
        const response = await cartApiRequest.paymentCart({ IDHoaDon: cart.IDHoaDon, TrangThai: STATUS_ENUM.PROCESSING });
        const { payload, status } = response as any;
        if (status === 200) {
            setIsShowDialog(true);
            setCart({});
            setLoading(false);
        }
        setLoading(false);
    }

    const description = () => {
        return (
            <>
                Đơn hàng của bạn đã được tiếp nhận chúng tôi sẽ liên hệ với bạn trong
                thời gian sớm nhất qua số điện thoại: <b><u>{user?.DienThoai}</u></b>
            </>
        )
    }

    return (
        <>
            <AlertDialogCustom
                isOpen={isShowDialog} isShowCancel={false}
                setIsOpen={setIsShowDialog}
                textCancel="Hủy" textConfirm="Tiếp tục mua sắm"
                title="Thông báo" description={description()}
                callBack={() => router.push(paths.products)}
            />
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Tổng tiền</h2>
                <div className="flex justify-between mb-2">
                    <span>Tổng đơn</span>
                    <span>{formatCurrency(totalBefore)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Giảm giá</span>
                    <span>{formatCurrency(totalDiscount)}</span>
                </div>
                <hr className="my-2"></hr>
                <div className="flex justify-between mb-2">
                    <span className="font-semibold">Tổng</span>
                    <span className="font-semibold">{formatCurrency(totalAfter)}</span>
                </div>
                <Button disabled={disablePayment} className="bg-blue-500 !text-white py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={onClickPayment}
                >
                    Thanh toán
                </Button>
            </div>
        </>
    )
}

export default TotalCart