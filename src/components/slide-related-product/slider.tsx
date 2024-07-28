"use client";
import React from "react";
import Slider from "react-slick";
import Slide from "./slide";
import { ProductResType } from "@/schemaValidations/product.schema";

function SlideRelated({ data }: { data: ProductResType[] }) {
    const numberConfig = 5;
    const settings = {
        dots: true,
        infinite: data.length > numberConfig,
        slidesToShow: numberConfig,
        slidesToScroll: numberConfig,
        autoplay: true,
        pauseOnHover: true,
    };
    return (
        <div className="container p-0">
            <Slider {...settings}>
                {data.map((slide, index) => (
                    <Slide key={index} data={slide} />
                ))}
            </Slider>
        </div>
    );
}

export default SlideRelated;
