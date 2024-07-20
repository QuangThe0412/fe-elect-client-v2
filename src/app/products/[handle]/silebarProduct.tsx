import { ScrollArea } from "@/components/ui/scroll-area"
import productApiRequest from "@/apiRequests/product";
import { CategoryResType } from "@/schemaValidations/product.schema";
import ChildSlideBar from "./child-slidebar";

const fetchCategories = async () => {
    const result = [] as CategoryResType[];
    return productApiRequest.getCategories().then((res) => {
        const { status, payload } = res;
        if (status === 200) {
            result.push(...(payload as any)?.data)
        }
        return result
    })
}

export async function SidebarProduct() {
    const categories = await fetchCategories();
    return (
        <div className='left-sidebar-height'>
            <div className="h-full">
                <ScrollArea className="h-full">
                    <div className="flex flex-col">
                        {categories?.map((category) => (
                            <ChildSlideBar category={category} key={category.IDLoaiMon} />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}