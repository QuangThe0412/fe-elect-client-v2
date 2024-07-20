import React from 'react';
import { defaultSort, sorting } from '@lib/constants';
import productApiRequest from '@/apiRequests/product';

export const metadata = {
    title: 'Search',
    description: 'Search for products in the store.'
};

const SearchPage = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
    const { sort, query } = searchParams as { [key: string]: string };
    const { sortKey, sortType } = sorting.find((item) => item.slug === sort) || defaultSort;

    const { status, payload } = await productApiRequest.getProducts(
        query,
        sortKey,
        sortType
    );
    console.log((payload as any)?.data);

    return (
        <div>SearchPage</div>
    )
}

export default SearchPage