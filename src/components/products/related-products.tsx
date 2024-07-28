import SlideRelated from '../slide-related-product/slider'
import productApiRequest from '@/apiRequests/product'
import { ProductResType } from '@/schemaValidations/product.schema'
import { ResponsePayloadType } from '@/lib/http'

const fetchRelateData = async (idCategory: number | undefined) => {
    return productApiRequest.getRelatedProducts(idCategory ?? 0).then((res) => {
        const { status, payload } = res as ResponsePayloadType;
        if (status === 200) {
            return (payload as any)?.data as ProductResType[];
        }
        return [] as ProductResType[];
    })
}

const RelatedProducts = async ({ idCategory }: { idCategory: number | undefined }) => {
    const result = await fetchRelateData(idCategory)
    return (
        <SlideRelated data={result} />
    )
}

export default RelatedProducts