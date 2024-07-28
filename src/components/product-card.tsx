import { FaStar, FaRegStar } from "react-icons/fa";
import { ProductResType } from '@/schemaValidations/product.schema';
import configEnv from '@/configEnv';
import ButtonAddCart from './button-add-cart';
import { formatCurrency, generateLinkGoogleImage, generateSlugLink } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/lib/paths';

const generateRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }
    return stars;
}

const ProductCard = ({ data }: { data: ProductResType }) => {
    const { IDMon, TenMon, Image: image, DonGiaBanLe = 0 } = data;

    const price = formatCurrency(DonGiaBanLe);
    const priceSale = formatCurrency(DonGiaBanLe + (DonGiaBanLe * 0.2));
    const href = `${paths.products}/${generateSlugLink(TenMon as string, IDMon as number)}`;
    return (
        <div className="px-4 py-4 border border-gray-200 rounded-xl min-w-[250px]
        cursor-pointer relative group hover:shadow-2xl">
            <Link href={href}>
                <Image className='img-card rounded-md'
                    priority
                    src={generateLinkGoogleImage(image as string)}
                    height={200}
                    width={300}
                    alt={'title'}
                />
                <div className="space-y-2 py-2">
                    <h2 className="text-accent font-medium uppercase line-clamp-1">{TenMon}</h2>
                    <div className="flex gap-1 text-[20px] text-[#FF9529]">
                        {generateRating(5)}
                    </div>
                    <div className="font-bold flex gap-4 justify-between">
                        {price}
                        <del className='text-gray-500 font-normal'>
                            {priceSale}
                        </del>
                    </div>
                </div>
            </Link>
            <div className="space-y-2 py-2">
                <ButtonAddCart id={IDMon ?? 0} />
            </div >
        </div>
    )
}

export default ProductCard