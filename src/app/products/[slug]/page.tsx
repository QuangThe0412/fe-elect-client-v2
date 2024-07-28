import productApiRequest from '@/apiRequests/product'
import configEnv from '@/configEnv';
import { formatCurrency, formatNumber, getIdFromSlugLink, slugifyHandle } from '@/lib/utils';
import { ProductResType } from '@/schemaValidations/product.schema';
import Image from 'next/image';
import ButtonAddCartPageDetails from '../../../components/products/button-add-cart-details';
import RelatedProducts from '../../../components/products/related-products';
import { ResponsePayloadType } from '@/lib/http';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Script from 'next/script'

const fetchDetail = cache(productApiRequest.getDetail);

const fetchDetailProducts = async (id: string) => {
    const { status, payload } = await fetchDetail(id) as ResponsePayloadType;
    if (status === 200) {
        return (payload as any)?.data as ProductResType;
    }
    return notFound();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const id = getIdFromSlugLink(params.slug);
    const collection = await fetchDetailProducts(id) as ProductResType;
    const { TenMon = '' } = collection;

    if (!collection) return notFound();
    return {
        title: TenMon,
        description: `Sản phẩm + ${TenMon}, ${TenMon} chất lượng, ${TenMon} giá rẻ,${slugifyHandle(TenMon)}`
    };
}

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
    const id = getIdFromSlugLink(params.slug);
    const product = await fetchDetailProducts(id);
    const { IDMon, IDLoaiMon, TenMon = '', Image: image, DonGiaBanSi, DonGiaBanLe, SoLuongTonKho, GhiChu } = product as ProductResType;
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + image}`

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: TenMon,
        description: GhiChu,
        image: src,
        offers: {
            '@type': 'AggregateOffer',
            availability: SoLuongTonKho
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            priceCurrency: DonGiaBanLe,
            highPrice: DonGiaBanLe,
            lowPrice: DonGiaBanSi
        }
    };

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
            <Script strategy='lazyOnload' type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
        </div>
    )
}

export default ProductDetailPage