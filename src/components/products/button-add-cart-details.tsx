"use client";
import { Button } from '@/components/ui/button'
import React from 'react'

const ButtonAddCartPageDetails = ({ idProduct }: { idProduct: number }) => {

    const HandleAddCart = (id: number) => {
        console.log('Add to cart', id)
    }

    return (
        <Button className='btn btn-primary mt-4' onClick={() => HandleAddCart(idProduct)}>
            Thêm vào giỏ hàng
        </Button>
    )
}

export default ButtonAddCartPageDetails