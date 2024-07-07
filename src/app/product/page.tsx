import productApiRequest from '@/apiRequests/product';
import React from 'react'
import { ProductResType } from "@/schemaValidations/product.schema";
import ItemProduct from './item';
import { PaginationProduct } from './pagination';
import ProductLayout from '@/layouts/ProductLayout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Product() {
    const { status, payload } = await productApiRequest.getList();
    const producs = (payload as any)?.data as ProductResType[];
    return (
        <ProductLayout>
            <div className="flex flex-col col-span-10 overflow-hidden h-full">
                <ScrollArea className='px-4 py-6 lg:px-8 h-full'>
                    <div className='px-4 py-6 lg:px-8 h-full'>
                        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 ">
                            {producs?.map((item: any) => (
                                <ItemProduct data={item} key={item.IDMon} />
                            ))}
                        </div>
                    </div>
                </ScrollArea>
                <PaginationProduct />
            </div>
        </ProductLayout>
    )
}
