import productApiRequest from '@/apiRequests/product';
import React, { useState } from 'react'
import { ProductResType } from "@/schemaValidations/product.schema";
import ItemProduct from './item';
import { PaginationProduct } from './pagination';
import ProductLayout from './layout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Product() {
    let currentPage = 1;
    const { status, payload } = await productApiRequest.getList(currentPage) as any;
    const data = payload?.data as any;
    console.log({ data });
    const totalPages = data?.totalPages as number;
    currentPage = data?.currentPage as number;
    const products = data?.result as ProductResType[];

    return (
        <ProductLayout>
            <div className="flex flex-col col-span-10 overflow-hidden h-full">
                <ScrollArea className='px-4 py-6 lg:px-8 h-full'>
                    <div className='px-4 py-6 lg:px-8 h-full'>
                        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 ">
                            {products?.map((item: any) => (
                                <ItemProduct data={item} key={item.IDMon} />
                            ))}
                        </div>
                    </div>
                </ScrollArea>
                {/* <PaginationProduct totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
            </div>
        </ProductLayout>
    )
}
