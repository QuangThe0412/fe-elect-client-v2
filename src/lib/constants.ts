export type SortFilterItem = {
    title: string;
    slug: string | null;
    sortKey: string;
    sortType: string;
};

export const defaultSort: SortFilterItem = {
    title: 'Giá: Thấp đến cao',
    slug: 'price-asc',
    sortKey: 'DonGiaBanLe',
    sortType: 'ASC'
};

export const sorting: SortFilterItem[] = [
    defaultSort,
    {
        title: 'Giá: Cao đến thấp',
        slug: 'price-desc',
        sortKey: 'DonGiaBanLe',
        sortType: 'DESC'
    }
];