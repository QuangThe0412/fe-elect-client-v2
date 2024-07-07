import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import productApiRequest from "@/apiRequests/product";
import { CategoryResType } from "@/schemaValidations/product.schema";

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
                        <div className="space-y-1 p-2">
                            {categories?.map((category) => (
                                <Button
                                    key={`${category.IDLoaiMon}`}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                >
                                    {category?.TenLoai}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}