import React from 'react'

import Image from 'next/image';
import { FaStar, FaRegStar } from "react-icons/fa";

export type ProductCardType = {
    id: number;
    img: string;
    title: string;
    decs: string;
    rating: number;
    price: number;
}

type ProductCardProps = {
    item: ProductCardType;
}

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


const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const { id, img, title, decs, rating, price } = item;
    const src = img;

    return (
        <div className="px-4 border border-gray-200 rounded-xl max-w-[400px]">
            <div>
                <Image className='w-full h-auto'
                    priority
                    src={src}
                    height={200}
                    width={300}
                    alt={title}
                />
            </div>
            <div className="space-y-2 py-2">
                <h2 className="text-accent font-medium uppercase">{title}</h2>
                <p className="text-gray-500 max-w-[150px]">{decs}</p>
                <div>
                    <div className="flex gap-1 text-[20px] text-[#FF9529]">
                        {generateRating(rating)}
                    </div>
                </div>
                <div className="font-bold flex gap-4">
                    {price}
                    <del className='text-gray-500 font-normal'>
                        {price + (price * 0.2)}
                    </del>
                </div>
            </div>
        </div>
    )
}

export default ProductCard