import { PaginationProduct } from './pagination';
import { SidebarProduct } from './SidabarProduct';
import DataProduct from './data';
import configEnv from '@/configEnv';
import productApiRequest from '@/apiRequests/product';
import { ResponsePayloadType } from '@/lib/http';
import { ProductResType } from '@/schemaValidations/product.schema';

export type ParamsProductProps = {
    searchParams?: {
        page?: string,
        query?: string,
    }
}
export default async function Product({searchParams}: ParamsProductProps) {
    const query = searchParams?.query || '';
    const page = searchParams?.page || '1';
    
    const { status, payload } = await productApiRequest.getList2(Number(page)) as ResponsePayloadType;
    const data = payload?.data as any;
    // console.log({ data });
    const totalPages = data?.totalPages as number;
    const products = data?.result as ProductResType[];

    return (
        <div className="grid grid-cols-12 h-full">
            <SidebarProduct />
            <div className="flex flex-col col-span-10 overflow-hidden h-full">
                <DataProduct query={query} currentPage={currentPage} />
                <PaginationProduct totalPages={totalPages} />
            </div>
        </div>
    )
}
