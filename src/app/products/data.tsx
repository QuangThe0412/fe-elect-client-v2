import ItemProduct from './item';
import { ProductResType } from '@/schemaValidations/product.schema';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function DataProduct({ products }: { products: ProductResType[] }) {
    return (
        <ScrollArea className='px-4 py-6 lg:px-8 h-full overflow-auto'>
            <div className='px-4 py-6 lg:px-8 h-full'>
                <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 ">
                    {products?.map((item: ProductResType) => (
                        <ItemProduct data={item} key={item.IDMon} />
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}

export default DataProduct;