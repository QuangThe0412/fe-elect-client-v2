import { PaginationProduct } from './pagination';
import { SidebarProduct } from './SidabarProduct';
import DataProduct from './data';

export type ParamsProductProps = {
    searchParams?: {
        page?: string,
        query?: string,
    }
}
export default async function Product({searchParams}: ParamsProductProps) {
    const query = searchParams?.query || '';
    const currentPage = searchParams?.page || '1';
    console.log({query, currentPage});
    return (
        <div className="grid grid-cols-12 h-full">
            <SidebarProduct />
            <div className="flex flex-col col-span-10 overflow-hidden h-full">
                <DataProduct query={query} currentPage={Number(currentPage)} />
                <PaginationProduct totalPages={10} />
            </div>
        </div>
    )
}
