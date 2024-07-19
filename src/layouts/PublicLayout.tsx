import Image from "next/image"
import image from "../../public/login.png"
import { usePathname } from "next/navigation"
import { paths } from "@/constants/paths"

const PublicLayout = ({ children }: any) => {
    const pathname = usePathname()
    const privatePaths = [paths.login, paths.register];

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <div className="w-full min-h-screen lg:grid lg:grid-cols-2 ">
                <div className="flex items-center justify-center">
                    {children}
                </div>
                {privatePaths.includes(pathname) && <div className="hidden flex items-center justify-center h-full w-full lg:flex">
                    <Image
                        src={image}
                        width={840}
                        alt="Image"
                        className="object-cover dark:brightness-[0.2] dark:grayscale"
                        priority
                    />
                </div>}
            </div>
        </div>
    )
}

export default PublicLayout