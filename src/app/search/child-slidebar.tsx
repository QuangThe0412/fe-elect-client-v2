"use client";
import { paths } from '@/lib/paths'
import { removeAccentAndSpecialChars } from '@/lib/utils';
import { CategoryResType } from '@/schemaValidations/product.schema'
import { usePathname, useRouter } from 'next/navigation'
import { BsHammer } from 'react-icons/bs'


const ChildSlideBar = ({ category }: { category: CategoryResType }) => {
    const { IDLoaiMon, TenLoai } = category;
    const router = useRouter();
    const pathname = usePathname()
    const categoryName = pathname.split('/')[2];
    const currentIdCategory = removeAccentAndSpecialChars(TenLoai) === categoryName ? IDLoaiMon : undefined;

    const HandleClickLink = (idLoaiMon: number | undefined) => {
        if (idLoaiMon === Number(currentIdCategory)) {
            router.push(`${paths.search}`);
        } else {
            router.push(`${paths.search}/${removeAccentAndSpecialChars(TenLoai)}`);
        }
    }

    return (
        <div onClick={() => HandleClickLink(IDLoaiMon)}
            className={
                `w-full justify-start border-b border-border-base 
                                     font-normal active:bg-primary-foreground active:text-primary-background
                                      hover:bg-primary-foreground hover:text-primary-background
                                      px-3.5 py-3.5 
                                      rounded-md cursor-pointer transition-colors duration-300 ease-in-out
                                      ${(Number(currentIdCategory) === IDLoaiMon) && 'bg-primary-foreground text-primary-background'}
                                      `
            }
        >
            <div className="flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group">
                <div className="inline-flex shrink-0 ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4">
                    <BsHammer size={24} />
                </div>
                {TenLoai}
            </div>
        </div>
    )
}

export default ChildSlideBar