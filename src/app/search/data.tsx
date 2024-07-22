import ProductCard from '@/components/product-card';
import { ProductResType } from '@/schemaValidations/product.schema';

function DataProduct({ products }: { products: ProductResType[] }) {
    return (
        <>
            {products.length > 0 ? (
                products.map((item) => (
                    <ProductCard data={item} key={item.IDMon} />
                ))
            ) : (
                <p className="text-center text-brand-dark font-semibold text-15px">
                    Không tìm thấy sản phẩm nào
                </p>
            )}
        </>
    );
}

export default DataProduct;