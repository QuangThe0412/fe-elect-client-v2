"use client";
import React from "react";
import Slider from "react-slick";
import Slide from "./slide";

const slideData = [
    {
        id: 0,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'New Collection',
        mainTitle: 'NEW FASHION SUMMER SALE',
        price: 100
    },
    {
        id: 1,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'Exclusive Deals',
        mainTitle: 'AUTUMN COLLECTION',
        price: 150
    },
    {
        id: 2,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'Winter Wonders',
        mainTitle: 'WINTER ESSENTIALS',
        price: 90
    },
    {
        id: 3,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'Spring Specials',
        mainTitle: 'BLOOM WITH COLOR',
        price: 120
    },
    {
        id: 4,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'Tech Gadgets',
        mainTitle: 'LATEST TECH ON SALE',
        price: 200
    },
    {
        id: 5,
        img: 'https://shopping-web-app.vercel.app/_next/image?url=%2Fbanner-1.jpg&w=2048&q=75',
        title: 'Home Decor',
        mainTitle: 'REFRESH YOUR SPACE',
        price: 80
    }
]

function SliderBanner() {
    const numberConfig = 1;
    const settings = {
        dots: true,
        infinite: numberConfig > 1,
        slidesToShow: numberConfig,
        slidesToScroll: numberConfig,
        autoplay: true,
        pauseOnHover: true,
    };
    return (
        <div className="container pt-6 lg:pt-0">
            <Slider {...settings}>
                {slideData.map((slide) => (
                    <Slide
                        key={slide.id}
                        img={slide.img}
                        title={slide.title}
                        mainTitle={slide.mainTitle}
                        price={slide.price} />
                ))}
            </Slider>
        </div>
    );
}

export default SliderBanner;
