'use client';

import { ShoppingCart } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Cart() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative inline-flex items-center h-16 w-16">
                    <ShoppingCart />
                    <div
                        className="absolute top-0 right-4 h-6 w-6 text-center -translate-x-1 translate-y-1 bg-red-500 text-white rounded-full"
                    >
                        <span className="w-full text-center text-sm">15</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => console.log('asdasd')}>
                        <span>Món 1</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('asdasd')}>
                        <span>Món 2</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span>Xem</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}