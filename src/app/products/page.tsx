"use client"
import { PaginationProduct } from './pagination';
import DataProduct from './data';
import { useSearchParams } from 'next/navigation';
import productApiRequest from '@/apiRequests/product';
import { useEffect, useState } from 'react';
import { ProductResType } from '@/schemaValidations/product.schema';
import { ResponsePayloadType } from '@/lib/http';
import { VscSettings } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Button } from '@/components/ui/button';

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
                        2,683 Items Found
                    </div>
                    <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                        <div className="flex items-center">
                            <div className="shrink-0 text-15px ltr:mr-2 rtl:ml-2 text-brand-dark text-opacity-70">
                                Sort by:
                            </div>
                            <Button className="relative w-full text-sm font-semibold rounded-lg cursor-pointer ltr:pr-5 rtl:pl-5 text-brand-dark ltr:text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-brand focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm" id="headlessui-listbox-button-2" type="button" aria-haspopup="true" aria-expanded="false">
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
                <DataProduct products={products} />
            </div>
        </>
        // <div className="flex flex-col col-span-10 overflow-hidden h-full">
        //     <DataProduct products={products} />
        //     <PaginationProduct totalPages={totalPages} />
        // </div>
    )
}
