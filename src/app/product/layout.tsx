import { SidebarProduct } from '@/app/product/SidabarProduct'

function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 h-full">
            <SidebarProduct />
            {children}
        </div>
    )
}

export default ProductLayout