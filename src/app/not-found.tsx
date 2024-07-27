import { paths } from '@/lib/paths'
import Link from 'next/link'
import img404 from '../../public/notfound.gif'
import Image from 'next/image'

const NotFoundPage = () => {
    return (
        <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex gap-6 flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-5xl font-dark font-bold">404</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">
                        Trang không tồn tại
                    </p>
                    <p className="mb-8">
                        Bấm vào nút bên dưới để quay lại trang chủ
                    </p>
                    <Link href={paths.home} className="px-4 inline py-2 text-sm 
                    font-medium leading-5 shadow text-white 
                    transition-colors duration-150 border
                     border-transparent rounded-lg focus:outline-none
                      focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 
                      hover:bg-blue-700">
                        Quay lại trang chủ
                    </Link>
                </div>
                <div className="max-w-lg relative">
                    <Image
                        priority
                        className='rounded-lg'
                        width={500} height={500}
                        src={img404} alt="404" />
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage