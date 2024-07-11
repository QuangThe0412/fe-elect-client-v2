"use client";
import React, { use, useEffect, useState } from 'react';
import ItemCart from './item';
import TotalCart from './total';
import cartApiRequest from '@/apiRequests/cart';
import { CartType } from '@/schemaValidations/cart.schema';

export default function Cart() {
    const [cart, setCart] = useState<CartType>({} as CartType);
    useEffect(() => {
        const fetchCart = async () => {
            const response = await cartApiRequest.getCart();
            console.log(response);
            const { payload, status } = response as any;
            if (status === 200) {
                setCart(payload?.data);
            }
        }

        fetchCart();
    }, []);
    return (
        <div className="bg-gray-100 h-screen py-8 h-full">
            <div className="container mx-auto px-4 h-full">
                <h1 className="text-2xl font-semibold mb-4">Giỏ hàng</h1>
                <div className="flex flex-col md:flex-row gap-4 h-full overflow-auto">
                    <div className="md:w-3/4 wrap-table height-table">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4 table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-scroll'>
                                    {
                                        cart.details?.map((item, index) => (
                                            <ItemCart key={index} data={item} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4 md-total-cart">
                        <TotalCart />
                    </div>
                </div>
            </div>
        </div>
    )
}