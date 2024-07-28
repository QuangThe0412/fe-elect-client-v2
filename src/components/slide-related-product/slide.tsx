import { ProductResType } from '@/schemaValidations/product.schema';
import configEnv from '@/configEnv';
import Image from 'next/image';
import { formatCurrency, generateSlugLink } from '@/lib/utils';
import Link from 'next/link';
import { paths } from '@/lib/paths';

const Slide = ({ data }: { data: ProductResType }) => {
    const { IDMon, TenMon = '', Image: image, DonGiaBanLe, } = data;
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + image}`
    const href = `${paths.products}/${generateSlugLink(TenMon as string, IDMon as number)}`;
    return (
        <div className='group flex h-full w-full items-center 
        justify-center overflow-hidden rounded-lg border 
        bg-white hover:border-blue-600 dark:bg-black relative
         border-neutral-200 dark:border-neutral-800'>
            <Image className='img-card rounded-md'
                priority
                src={src}
                height={500}
                width={600}
                sizes="100vw"
                alt={TenMon}
            />
            <Link className="absolute bottom-0 left-0 flex w-full px-4 pb-4" href={href}>
                <div className="flex items-center rounded-full border bg-white/70 
                p-1 text-xs font-semibold text-black backdrop-blur-md 
                dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                        {TenMon}
                    </h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                        {formatCurrency(DonGiaBanLe)}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default Slide