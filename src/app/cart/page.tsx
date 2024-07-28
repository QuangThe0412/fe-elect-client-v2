"use client";
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import ItemCart from './item';
import TotalCart from './total';

export default function Cart() {
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    return (
        <div className="bg-gray-100 h-screen py-8 h-full">
            <div className="container mx-auto px-4 h-full">
                <div className="flex flex-col md:flex-row gap-4 h-full overflow-auto">
                    <div className="h-full md:w-3/4">
                        <div className="flex bg-white h-full rounded-lg shadow-md p-6 mb-4 overflow-hidden">
                            <table className='h-full table-fixed'>
                                <thead className='h-16'>
                                    <tr>
                                        <th className="text-center font-semibold border border-slate-300">Sản phẩm</th>
                                        <th className="text-center font-semibold border border-slate-300">Giá</th>
                                        <th className="text-center font-semibold border border-slate-300">Số lượng</th>
                                        <th className="text-center font-semibold border border-slate-300 hidden md:table-cell">Chiết khấu</th>
                                        <th className="text-center font-semibold border border-slate-300">Tổng</th>
                                        <th className="text-center font-semibold border border-slate-300 hidden md:table-cell"></th>
                                    </tr>
                                </thead>
                                <tbody className='height-body'>
                                    {
                                        cart?.details?.map((item, index) => (
                                            <ItemCart key={index} data={item} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <TotalCart />
                    </div>
                </div>
            </div>
        </div>
    )
}