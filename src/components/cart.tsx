'use client';
import { BsCart } from 'react-icons/bs'

type CartIconProps = {
    number: number | undefined;
    onClick: () => void;
}
export default function CartIcon({ number, onClick }: CartIconProps) {
    return (
        <div className="relative inline-flex items-center" onClick={onClick}>
            <BsCart />
            {
                (number ?? 0) > 0 &&
                <div className="absolute bottom-4 left-4 h-6 w-6 text-center 
            -translate-x-1 translate-y-1 bg-red-500 text-white rounded-full">
                    <span className="w-full text-center text-sm">{number}</span>
                </div>
            }
        </div>
    )
}