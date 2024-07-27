'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { defaultSort } from '@/lib/constants';
import { paths } from '@/lib/paths';

const ButtonSeeMore = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handleClick = () => {
        const sortKey = searchParams.get('sortKey') || defaultSort.sortKey;
        const sortType = searchParams.get('sortType') || defaultSort.sortType;
        router.push(`${paths.search}/?sortKey=${sortKey}&sortType=${sortType}&page=${currentPage + 1}`);
    };

    return (
        <Button className='bg-accent text-brand-dark font-semibold text-15px 
                                border border-border-base rounded-lg px-4 py-2'
            onClick={() => handleClick()}
        >
            Xem thêm
        </Button>
    )
}

export default ButtonSeeMore;