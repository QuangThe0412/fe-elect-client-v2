import { formatCurrency } from '@/lib/utils'
import useCartStore, { TypeCartStore } from '@/store/cart.store'

function TotalCart() {
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    const details = cart?.details ?? [];
    const totalBefore = details.reduce((acc, item) => acc + (item.TienChuaCK ?? 0), 0);
    const totalAfter = details.reduce((acc, item) => acc + (item.TienSauCK ?? 0), 0);
    const totalDiscount = details.reduce((acc, item) => acc + (item.TienCK ?? 0), 0);

    return (
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
            <button className="bg-blue-500 !text-white py-2 px-4 rounded-lg mt-4 w-full">Thanh toán</button>
        </div>
    )
}

export default TotalCart