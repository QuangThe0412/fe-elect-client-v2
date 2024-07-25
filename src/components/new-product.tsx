import React from 'react'
import ProductCard from './product-card';
import productApiRequest from '@/apiRequests/product';
import { ProductResType } from '@/schemaValidations/product.schema';
import { ResponsePayloadType } from '@/lib/http';

const dataNewProduct = [] as ProductResType[];
productApiRequest.getNewProducts().then((res) => {
    const { status, payload } = res as ResponsePayloadType;
    if (status === 200) {
        dataNewProduct.push(...((payload as any)?.data || []));
    }
});

const NewProduct = () => {
    return (
        <>
            <div className="container pt-16">
                <h2 className="font-medium text-2xl pb-4">New Products</h2>
                <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                    {
                        dataNewProduct.map((item, index) => (
                            <ProductCard key={index} data={item} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NewProduct