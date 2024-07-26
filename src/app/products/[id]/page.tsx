import productApiRequest from '@/apiRequests/product'
import configEnv from '@/configEnv';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { ProductResType } from '@/schemaValidations/product.schema';
import Image from 'next/image';
import React from 'react'
import ButtonAddCartPageDetails from '../../../components/products/button-add-cart-details';
import RelatedProducts from '../../../components/products/related-products';
import { ResponsePayloadType } from '@/lib/http';

const fetchDetailProducts = async (id: string) => {
    const { status, payload } = await productApiRequest.getDetail(id) as ResponsePayloadType;
    if (status === 200) {
        return (payload as any)?.data as ProductResType;
    }
    return {} as ProductResType;
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
    const products = await fetchDetailProducts(params.id);
    const { IDMon, IDLoaiMon, TenMon = '', Image: image,
        DVTMon, DonGiaBanSi, DonGiaBanLe, DonGiaVon,
        SoLuongTonKho, ThoiGianBH, GhiChu } = products;
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + image}`

    return (
        <div className='container pt-6 lg:pt-0'>
            <div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
                <div className='h-full w-full basis-full lg:basis-4/6'>
                    <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
                        <Image className='rounded-md mx-auto object-contain'
                            priority
                            src={src}
                            height={500}
                            width={600}
                            sizes="100vw"
                            alt={TenMon}
                        />
                    </div>
                </div>
                <div className='basis-full lg:basis-2/6'>
                    <div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
                        <h1 className='mb-2 text-5xl font-medium'>{TenMon}</h1>
                        <div className='mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white'>
                            {formatCurrency(DonGiaBanLe)}
                        </div>
                    </div>
                    <div className='border-b pb-8'>
                        <h2 className='mb-2 text-xl font-semibold'>Tồn kho</h2>
                        <p className='text-base'>{formatNumber(SoLuongTonKho)}</p>
                    </div>
                    <div className='border-b pb-8 mt-4'>
                        <h2 className='mb-2 text-xl font-semibold'>Chi tiết</h2>
                        <p className='text-base'>{GhiChu}</p>
                    </div>
                    <div className='text-center mt-4'>
                        <ButtonAddCartPageDetails idProduct={IDMon ?? 0} />
                    </div>
                </div>
            </div>
            <div className='py-8'>
                <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
            </div>
            <div>
                <RelatedProducts idCategory={IDLoaiMon} />
            </div>
        </div>
    )
}

export default ProductDetailPage