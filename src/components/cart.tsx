'use client';
import { paths } from "@/constants/paths";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
    return (
        <Link className="relative inline-flex items-center h-16 w-16" href={paths.cart}>
            <ShoppingCart />
            <div className="absolute top-0 right-4 h-6 w-6 text-center 
            -translate-x-1 translate-y-1 bg-red-500 text-white rounded-full">
                <span className="w-full text-center text-sm">15</span>
            </div>
        </Link>
    )
}