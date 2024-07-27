"use client";
import { paths } from '@/lib/paths';
import Link from 'next/link';
import { BsHouseDoor } from "react-icons/bs"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { UserNav } from './user-nav';
import MobileMenuDrawer from './mobile-menu-drawer';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore, { TypeUsers } from '@/store/auth.store';

type MobileNavBarProps = {
    numberCart: number | undefined;
}

const MobileNavBar = ({ numberCart }: MobileNavBarProps) => {
    const pathName = usePathname();
    const router = useRouter()
    const { user, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))

    const hadUser = !!(user && Object.keys(user).length);

    const HandleOnClickCart = () => {
        if (hadUser) {
            router.push(paths.cart)
        } else {
            setIsShowLoginDialog(true)
        }
    }

    return (
        <>
            <div className="lg:hidden fixed bottom-0 w-full 
                                bg-white left-[50%] -translate-x-[50%]
                                mob_navbar px-8 z-10 border">
                <div className="flex justify-between items-center text-[28px] py-2">
                    <MobileMenuDrawer />
                    <div className="relative" onClick={HandleOnClickCart}>
                        <HiOutlineShoppingBag className={`${pathName === paths.cart ? 'text-accent' : ''}`} />
                        {
                            (numberCart ?? 0) > 0 &&
                            <div className="bg-red-600 rounded-full absolute
                                            top-0 right-0 w-[18px] h-[18px] text-[12px]
                                            text-white grid place-items-center translate-x-1 
                                            -translate-y-1">
                                {numberCart}
                            </div>
                        }
                    </div>
                    <Link href={paths.home}>
                        <BsHouseDoor className={`${pathName === paths.home ? 'text-accent' : ''}`} />
                    </Link>

                    <UserNav />
                </div>
            </div >
        </>
    )
}

export default MobileNavBar