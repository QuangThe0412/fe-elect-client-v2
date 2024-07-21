import React from 'react'
import { ProductResType } from '@/schemaValidations/product.schema';
import configEnv from '@/configEnv';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { paths } from '@/lib/paths';

const Slide = ({ data }: { data: ProductResType }) => {
    const { IDMon, IDLoaiMon, TenMon = '', Image: image,
        DVTMon, DonGiaBanSi, DonGiaBanLe, DonGiaVon,
        SoLuongTonKho, ThoiGianBH, GhiChu } = data;
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + image}`
    return (
        <Link className='group flex h-full w-full items-center 
        justify-center overflow-hidden rounded-lg border 
        bg-white hover:border-blue-600 dark:bg-black relative
         border-neutral-200 dark:border-neutral-800' href={`${paths.products}/${IDMon}`}>
            <Image className='rounded-md object-contain'
                priority
                src={src}
                height={500}
                width={600}
                sizes="100vw"
                alt={TenMon}
            />
            <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
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
            </div>
        </Link>
    )
}

export default Slide