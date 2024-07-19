import ProductCard from '@/components/product-card';
import ItemProduct from './item';
import { ProductResType } from '@/schemaValidations/product.schema';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function DataProduct({ products }: { products: ProductResType[] }) {
    const template = () => {
        if (products.length > 0) {
            return (
                products?.map((item: ProductResType) => (
                    <ProductCard data={item} key={item.IDMon} />
                ))
            )
        } else {
            return (
                <div className='text-center text-lg text-gray-500'>Không tìm thấy sản phẩm</div>
            )
        }
    }

    return (
        <>
            {template()}
        </>
    );
}

export default DataProduct;