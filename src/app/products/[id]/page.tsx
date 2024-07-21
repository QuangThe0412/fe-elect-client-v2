import productApiRequest from '@/apiRequests/product'
import { ProductResType } from '@/schemaValidations/product.schema';
import React from 'react'

const fetchDetailProducts = async (id: string) => {
    const { status, payload } = await productApiRequest.getDetail(id);
    if (status === 200) {
        return (payload as any)?.data as ProductResType;
    }
    return {} as ProductResType;
}

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
    const products = await fetchDetailProducts(params.id);
    const { IDMon, IDLoaiMon, TenMon, Image,
        DVTMon, DonGiaBanSi, DonGiaBanLe, DonGiaVon,
        SoLuongTonKho, ThoiGianBH, GhiChu } = products;

    return (
        <>
            <h1>{TenMon}</h1>
        </>
    )
}

export default ProductDetailPage