import { SidebarProduct } from './silebarProduct'

function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex-grow" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className='border-t border-border-base '></div>
            <div className='mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10'>
                <div className='flex pt-7 lg:pt-7 gap-6'>
                    <div className='sticky hidden h-full shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96'>
                        <div className='block'>
                            <h3 className='text-brand-dark text-15px sm:text-base font-semibold mb-5 mt-1'>
                                Loại món
                            </h3>
                            <div className='max-h-full overflow-hidden rounded-xl border border-border-base'>
                                <SidebarProduct />
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1 '>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductLayout