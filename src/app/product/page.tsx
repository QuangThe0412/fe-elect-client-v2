"use client"
import { PaginationProduct } from './pagination';
import DataProduct from './data';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Product() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || '';

    return (
        <div className="flex flex-col col-span-10 overflow-hidden h-full">
            <DataProduct query={query} currentPage={Number(currentPage)} />
            <PaginationProduct totalPages={10} />
        </div>
    )
}
