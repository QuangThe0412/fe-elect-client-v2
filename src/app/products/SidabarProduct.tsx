import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import productApiRequest from "@/apiRequests/product";
import { CategoryResType } from "@/schemaValidations/product.schema";
import Link from "next/link";
import { paths } from "@/constants/paths";

export async function SidebarProduct() {
    const categoriesRes = await productApiRequest.getCategories();
    const categories = (categoriesRes?.payload as any)?.data as CategoryResType[];

    return (
        <div className='pb-12 col-span-2 left-sidebar-height'>
            <div className="space-y-4 py-4 h-full">
                <div className="py-2 h-full">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        Thể loại
                    </h2>
                    <ScrollArea className="px-1 h-full">
                        <div className="space-y-1 p-2 flex flex-col">
                            {categories?.map((category) => (
                                <Link
                                    href={`${paths.products}?page=1&category=${category.IDLoaiMon}`}
                                    key={`${category.IDLoaiMon}`}
                                    className="w-full justify-start font-normal"
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