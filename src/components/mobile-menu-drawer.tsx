import React from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerPortal,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { LuMenu } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import { pathsArray } from '@/lib/paths'
import Link from 'next/link'

const MobileMenuDrawer = () => {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();
    const firstPath = pathname?.split('/')[1];
    const Paths = pathsArray.map((item) => {
        const path = item.path.split('/')[1];
        let isActive = false;
        if (firstPath === path) {
            isActive = true;
        }

        return (
            <Link key={item.path} className={`navbar__link_mobile relative 
                ${isActive && 'active'}`}
                href={item.path}>{item.name}</Link>
        )
    });
    return (
        <Drawer direction='right' open={open} onOpenChange={setOpen}>
            <DrawerTrigger>
                <LuMenu />
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay className="fixed inset-0 bg-black/40 w-auto" />
                <DrawerContent className="bg-white flex flex-col rounded-t-lg 
                h-full w-[200px] mt-24 ml-auto fixed bottom-0 right-0">
                    <div className="p-4 bg-white flex-1 h-full">
                        <div className="w-auto mx-auto" onClick={() => setOpen(false)}>
                            {Paths}
                        </div>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>

    )
}

export default MobileMenuDrawer