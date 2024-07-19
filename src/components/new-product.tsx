import React from 'react'
import ProductCard from './product-card';

export type ProductCardType = {
    id: number;
    img: string;
    title: string;
    decs: string;
    rating: number;
    price: number;
}

const mockData: ProductCardType[] = [
    {
        id: 1,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fjacket-1.jpg&w=256&q=75',
        title: 'Jacket',
        decs: 'some thing about jacket',
        rating: 3,
        price: 100
    },
    {
        id: 2,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fjacket-2.jpg&w=256&q=75',
        title: 'Winter Jacket',
        decs: 'some thing about winter jacket',
        rating: 4,
        price: 150
    },
    {
        id: 3,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fjacket-1.jpg&w=256&q=75',
        title: 'Leather Jacket',
        decs: 'some thing about leather jacket',
        rating: 5,
        price: 200
    },
    {
        id: 4,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fjacket-2.jpg&w=256&q=75',
        title: 'Denim Jacket',
        decs: 'some thing about denim jacket',
        rating: 4,
        price: 120
    },
    {
        id: 5,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fjacket-1.jpg&w=256&q=75',
        title: 'Bomber Jacket',
        decs: 'some thing about bomber jacket',
        rating: 4,
        price: 130
    }
]

const NewProduct = () => {
    return (
        <>
            <div className="container pt-16">
                <h2 className="font-medium text-2xl pb-4">New Products</h2>
                <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                    {
                        mockData.map((item, index) => (
                            <ProductCard key={index} item={item} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NewProduct