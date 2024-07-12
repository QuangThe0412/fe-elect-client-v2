'use client';
import { ShoppingCart } from "lucide-react";

type CartIconProps = {
    number: number | undefined;
    onClick: () => void;
}

export default function CartIcon({ number, onClick }: CartIconProps) {
    return (
        <div className="relative inline-flex items-center h-16 w-16" onClick={onClick}>
            <ShoppingCart />
            <div className="absolute top-0 right-4 h-6 w-6 text-center 
            -translate-x-1 translate-y-1 bg-red-500 text-white rounded-full">
                <span className="w-full text-center text-sm">{number}</span>
            </div>
        </div>
    )
}