import Image from "next/image"
import image from "../../public/login.png"

const PublicLayout = ({ children }: any) => {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center">
                    {children}
                </div>
                <div className="hidden flex items-center justify-center h-full w-full lg:flex">
                    <Image
                        src={image}
                        width={840}
                        alt="Image"
                        className="object-cover dark:brightness-[0.2] dark:grayscale"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default PublicLayout