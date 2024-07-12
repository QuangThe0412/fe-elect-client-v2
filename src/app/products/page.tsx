"use client"
import { PaginationProduct } from './pagination';
import DataProduct from './data';
import { useSearchParams } from 'next/navigation';
import productApiRequest from '@/apiRequests/product';
import { useEffect, useState } from 'react';
import { ProductResType } from '@/schemaValidations/product.schema';
import { ResponsePayloadType } from '@/lib/http';

export default function Product() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<ProductResType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            const { status, payload } = await productApiRequest.getList(searchParams) as ResponsePayloadType;
            if (status == 200) {
                const data = payload?.data;
                setTotalPages(data?.totalPages as number);
                setProducts(data?.result as ProductResType[]);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className="flex flex-col col-span-10 overflow-hidden h-full">
            <DataProduct products={products} />
            <PaginationProduct totalPages={totalPages} />
        </div>
    )
}
