import { SidebarProduct } from '@/app/product/SidabarProduct'
import React from 'react'

async function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 h-full">
            <SidebarProduct/>
            {children}
        </div>
    )
}

export default ProductLayout