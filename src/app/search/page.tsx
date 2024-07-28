import { defaultSort } from '@lib/constants';
import productApiRequest from '@/apiRequests/product';
import { formatNumber } from '@/lib/utils';
import DataProduct from './data';
import PaginationProduct from '@/components/pagination';
import { ResponsePayloadType } from '@/lib/http';
import Filter from './filter';
import { MobileCategory } from './mobile-category';


const fetchData = async ({ query, page, sortKey, sortType }
    : { query: string, page: string, sortKey: string, sortType: string }) => {
    const { status, payload } = await productApiRequest.getProducts(query, page, sortKey, sortType) as ResponsePayloadType;
    const { result, totalPages, currentPage, itemsPerPage, totalItems } = (payload as any)?.data || {};

    return { result, totalPages, currentPage, itemsPerPage, totalItems };
}

const SearchPage = async ({ searchParams }
    : { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const { query, page, sortKey, sortType } = searchParams as { [key: string]: string };
    const { result, totalPages, currentPage, itemsPerPage, totalItems } = await fetchData({
        query,
        page: page || '1',
        sortKey: sortKey || defaultSort.sortKey,
        sortType: sortType || defaultSort.sortType
    });

    return (
        <>
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

export default SearchPage