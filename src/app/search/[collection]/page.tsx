import productApiRequest from '@/apiRequests/product';
import { defaultSort } from '@/lib/constants';
import { formatNumber } from '@/lib/utils';
import DataProduct from '../data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryResType } from '@/schemaValidations/product.schema';
import { PaginationProduct } from '@/components/pagination';
import { ResponsePayloadType } from '@/lib/http';
import { MobileCategory } from '../mobile-category';
import { Filter } from '../filter';
import { cache } from 'react';

export async function generateMetadata({
    params
}: {
    params: { collection: string };
}): Promise<Metadata> {
    const collection = await productApiRequest.getCollectionDetails(params.collection);
    const { status, payload } = collection as ResponsePayloadType;
    if (status !== 200) return notFound();
    const { TenLoai } = (payload as any)?.data as CategoryResType;
    const title = TenLoai || params.collection;
    if (!collection) return notFound();

    return {
        title: 'Loại sản phẩm ' + title,
        description: 'Danh sách sản phẩm thuộc ' + TenLoai
    };
}

const CategoryPage = async ({
    params,
    searchParams
}: {
    params: { collection: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { query, page, sortKey, sortType } = searchParams as { [key: string]: string };
    const { collection } = params;

    const { status, payload } = await productApiRequest.getCollectionProducts(
        collection,
        query,
        page || '1',
        sortKey || defaultSort.sortKey,
        sortType || defaultSort.sortType
    ) as ResponsePayloadType;
    const { result, totalPages, currentPage, itemsPerPage, totalItems } = (payload as any)?.data || {};
    return (<>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between w-full lg:justify-between">
                <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5">
                    {formatNumber(totalItems)} sản phẩm
                </div>
                <div className="relative block md:hidden ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                    <div className="flex items-center">
                        <MobileCategory />
                    </div>
                </div>
                <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                    <div className="flex items-center">
                        <Filter />
                    </div>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
            <DataProduct products={result} />
        </div>
        <div className='flex justify-center text-center p-8'>
            {/* {currentPage <= totalPages && <ButtonSeeMore />} */}
            {totalItems > 0 && <PaginationProduct totalPages={totalPages} />}
        </div>
    </>
    )
}

export default CategoryPage