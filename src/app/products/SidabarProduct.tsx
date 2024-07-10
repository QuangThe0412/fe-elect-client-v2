"use client";
import { ScrollArea } from "@/components/ui/scroll-area"
import productApiRequest from "@/apiRequests/product";
import { CategoryResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import { paths } from "@/constants/paths";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";

export function SidebarProduct() {
    const searchParams = useSearchParams();
    const currenCategory = searchParams.get('category');
    const [categories, setCategories] = useState<CategoryResType[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesRes = await productApiRequest.getCategories();
            const categories = (categoriesRes?.payload as any)?.data as CategoryResType[];
            setCategories(categories);
        };
        fetchData();
    }, []);

    return (
        <div className='col-span-2 left-sidebar-height'>
            <div className="h-full">
                <div className="py-2 h-full">
                    <ScrollArea className="px-1 h-full">
                        <div className="space-y-1 p-2 flex flex-col">
                            {categories?.map((category) => (
                                <Link
                                    href={`${paths.products}?page=1&category=${category.IDLoaiMon}`}
                                    key={`${category.IDLoaiMon}`}
                                    className={
                                        `w-full justify-start
                                     font-normal active:bg-primary-foreground active:text-primary-background
                                      hover:bg-primary-foreground hover:text-primary-background px-4 py-2 
                                      rounded-md cursor-pointer transition-colors duration-300 ease-in-out
                                      ${(Number(currenCategory) === category.IDLoaiMon) && 'bg-primary-foreground text-primary-background'}
                                      `
                                    }
                                >
                                    {category?.TenLoai}
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}