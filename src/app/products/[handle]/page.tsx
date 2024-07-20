import productApiRequest from '@/apiRequests/product'
import DataProduct from '@/app/products/[handle]/data';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { DataProductResType } from '@/schemaValidations/product.schema';
import React from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';

const fetchProducts = async (handle: string) => {
    const { status, payload } = await productApiRequest.getList(handle);
    if (status === 200) {
        return (payload as any)?.data as DataProductResType;
    }
    return {} as DataProductResType;
}

const ProductPage = async ({ params }: { params: { handle: string } }) => {
    const products = await fetchProducts(params.handle);
    const { result, totalPages, currentPage, itemsPerPage, totalItems } = products;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button className="flex items-center px-4 py-2 text-sm 
                font-semibold transition duration-200 ease-in-out border 
                rounded-md lg:hidden text-brand-dark border-border-base 
                focus:outline-none hover:border-brand hover:text-brand">
                    <VscSettings />
                    <span className="ltr:pl-2.5 rtl:pr-2.5">
                        Filters
                    </span>
                </Button>
                <div className="flex items-center justify-end w-full lg:justify-between">
                    <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5">
                        {formatNumber(totalItems)} sản phẩm
                    </div>
                    <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                        <div className="flex items-center">
                            <div className="shrink-0 text-15px ltr:mr-2 rtl:ml-2 text-brand-dark text-opacity-70">
                                Sort by:
                            </div>
                            <Button className="relative w-full text-sm font-semibold rounded-lg cursor-pointer ltr:pr-5 rtl:pl-5
                             text-brand-dark ltr:text-left rtl:text-right focus:outline-none focus-visible:ring-2
                              focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-brand 
                              focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                                id="headlessui-listbox-button-2" type="button" aria-haspopup="true" aria-expanded="false">
                                <span className="block truncate">
                                    Lowest Price
                                </span>
                                <span className="absolute flex items-end pointer-events-none top-1 ltr:right-0 rtl:left-0 ltr:pl-1 rtl:pr-1">
                                    <MdOutlineKeyboardArrowDown />
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
                <DataProduct products={result} />
            </div>
            <div className='flex justify-center text-center p-8'>
                <Button className='bg-accent text-brand-dark font-semibold text-15px border border-border-base rounded-lg px-4 py-2'>
                    Xem thêm
                </Button>
            </div>
        </>
    )
}

export default ProductPage