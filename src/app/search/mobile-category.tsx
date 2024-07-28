"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CategoryResType } from "@/schemaValidations/product.schema"
import productApiRequest from "@/apiRequests/product"
import { ResponsePayloadType } from "@/lib/http"
import { paths } from "@/lib/paths"
import { ScrollArea } from "@/components/ui/scroll-area"
import { slugifyHandle } from "@/lib/utils"

export function MobileCategory() {
    const AllOption: CategoryResType = {
        IDLoaiMon: 0,
        IDNhomMon: 0,
        TenLoai: 'Tất cả',
    }
    const [categories, setCategories] = useState([] as CategoryResType[]) || [];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productApiRequest.getCollection();
                const { status, payload } = res as ResponsePayloadType;
                if (status === 200) {
                    const data = (payload as any)?.data || [];
                    setCategories([AllOption, ...data]);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const router = useRouter();
    const pathname = usePathname();
    const categoryPath = pathname.split('/')[2] || AllOption.TenLoai;
    const categoryMatch = categories.find((item) => slugifyHandle(item.TenLoai as string) === categoryPath) || AllOption;

    const HandleOnSelect = (idLoaiMon: number) => {
        if (idLoaiMon === 0) {
            router.push(paths.search)
        } else {
            const selectedCategory = categories.find((item) => item.IDLoaiMon === idLoaiMon)
            const nameFilter = slugifyHandle(selectedCategory?.TenLoai || '')
            router.push(`${paths.search}/${nameFilter}`)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {categoryMatch?.TenLoai || AllOption.TenLoai}
                    <MdOutlineKeyboardArrowDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <ScrollArea className="h-64">
                    {
                        categories.map((item, index) => (
                            <DropdownMenuCheckboxItem key={index}
                                onSelect={() => HandleOnSelect(Number(item?.IDLoaiMon))}
                                checked={categoryMatch?.IDLoaiMon === item?.IDLoaiMon}
                            >
                                {item?.TenLoai || ''}
                            </DropdownMenuCheckboxItem>
                        ))
                    }
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
