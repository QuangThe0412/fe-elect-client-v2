import { paths } from '@/lib/paths';
import Link from 'next/link';
import { BsHouseDoor } from "react-icons/bs"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { UserNav } from './user-nav';
import MobileMenuDrawer from './mobile-menu-drawer';

type MobileNavBarProps = {
    numberCart: number | undefined;
}

const MobileNavBar = ({ numberCart }: MobileNavBarProps) => {
    return (
        <>
            <div className="lg:hidden fixed bottom-0 w-full 
                                bg-white left-[50%] -translate-x-[50%] max-w-[500px] 
                                mob_navbar px-8 z-10 border">
                <div className="flex justify-between items-center text-[28px] py-2">                   
                    <MobileMenuDrawer />
                    <Link className="relative" href={paths.cart}>
                        <HiOutlineShoppingBag />
                        {
                            (numberCart ?? 0) > 0 &&
                            <div className="bg-red-600 rounded-full absolute
                                            top-0 right-0 w-[18px] h-[18px] text-[12px]
                                            text-white grid place-items-center translate-x-1 
                                            -translate-y-1">
                                {numberCart}
                            </div>
                        }
                    </Link>
                    <Link href={paths.home}>
                        <BsHouseDoor />
                    </Link>

                    <UserNav />
                </div>
            </div >
        </>
    )
}

export default MobileNavBar