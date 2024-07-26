import { BsSearch } from "react-icons/bs"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { paths } from "@/lib/paths";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import { useRouter } from "next/navigation";

type CartIconProps = {
    number: number | undefined;
}

const HeaderMain = ({ number }: CartIconProps) => {
    const router = useRouter()
    return (
        <div className="border-b border-gray-200 py-6">
            <div className="container sm:flex justify-between items-center">
                <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
                    <span className="text-accent">Tâm nhi</span>
                </div>
                <div className="w-full sm:w-[300px] md:w-[70%] relative">
                    <Search />
                    <BsSearch className="absolute right-0 top-0 mr-2 mt-2.5 text-gray-400" />
                </div>
                <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                    <UserNav />

                    <div className="relative" onClick={() => router.push(paths.cart)}>
                        <HiOutlineShoppingBag size={25} />
                        {
                            (number ?? 0) > 0 &&
                            <div className="bg-red-600 rounded-full absolute
                                            top-0 right-0 w-[18px] h-[18px] text-[12px]
                                             text-white grid place-items-center translate-x-1 
                                             -translate-y-1">
                                {number}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain