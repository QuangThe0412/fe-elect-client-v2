export type SortFilterItem = {
    title: string;
    sortKey: string;
    sortType: string;
};

export const defaultSort: SortFilterItem = {
    title: 'Giá: Thấp đến cao',
    sortKey: 'DonGiaBanLe',
    sortType: 'ASC'
};

export const sorting: SortFilterItem[] = [
    defaultSort,
    {
        title: 'Giá: Cao đến thấp',
        sortKey: 'DonGiaBanLe',
        sortType: 'DESC'
    }
];

export enum STATUS_ENUM {
    PENDING = 0,
    FINISH = 1,
    CANCEL = 2,
    PROCESSING = 3
}