import productApiRequest from '@/apiRequests/product';
import { SidebarProduct } from '@/app/product/SidabarProduct'
import { CategoryResType } from '@/schemaValidations/product.schema';
import React, { useState } from 'react'

async function ProductLayout({ children }: { children: React.ReactNode }) {
    const categoriesRes = await productApiRequest.getCategories();
    const categories = (categoriesRes?.payload as any)?.data as CategoryResType[];
    
    return (
        <div className="grid grid-cols-12 h-full">
            <SidebarProduct categories={categories}/>
            {children}
        </div>
    )
}

export default ProductLayout