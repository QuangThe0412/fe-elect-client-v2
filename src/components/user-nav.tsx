"use client";

import { BsFillPersonFill } from 'react-icons/bs'
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TypeDataAccountRes } from "@/schemaValidations/account.schema"
import { useState } from "react"
import { DialogProfile } from "@/components/profile/dialog-profile"
import { ChangePassword } from "./change-password/change-password"
import accountApiRequest from "@/apiRequests/account"
import useAuthStore, { TypeUsers } from "@/store/auth.store";
import useCartStore, { TypeCartStore } from "@/store/cart.store";
import { CartType } from "@/schemaValidations/cart.schema";
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/paths';
import { ResponsePayloadType } from '@/lib/http';
import { FaSpinner } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import { removeCookie } from '@/lib/utils';

export function UserNav() {
  const router = useRouter()
  const { user, setUser, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
    user: state.user,
    setUser: state.setUser,
    setIsShowLoginDialog: state.setIsShowLoginDialog
  }))

  const { setCart } = useCartStore((state: TypeCartStore) => ({
    setCart: state.setCart,
  }))

  const [openDialogProfile, setOpenDialogProfile] = useState(false);
  const [openDialogChangePassword, setOpenDialogChangePassword] = useState(false);

  const hadUser = !!(user && Object.keys(user).length);

  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    if (isMobile) {
      setIsShowLoginDialog(true);
    } else {
      setLoading(true);
      router.push(paths.login);
    }
  };

  const logout = () => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    setUser({} as TypeDataAccountRes)
    setCart({} as CartType)
  }

  return (
    <>
      <DialogProfile open={openDialogProfile} onClose={() => setOpenDialogProfile(false)} />
      <ChangePassword open={openDialogChangePassword} onClose={() => setOpenDialogChangePassword(false)} />
      {
        hadUser
          ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-accent-custom">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.TenKhachHang?.split('')[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.TenKhachHang}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.DienThoai}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setOpenDialogProfile(true)}>
                    <BsFillPersonFill className="mr-2 h-4 w-4" />
                    <span>Cập nhật thông tin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenDialogChangePassword(true)}>
                    <IoSettingsOutline className="mr-2 h-4 w-4" />
                    <span>Đổi mật khẩu</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <RiLogoutCircleLine className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
          : (
            <div>
              {loading ? (
                <FaSpinner className="text-accent animate-spin" size={25} />
              ) : (
                <BsFillPersonFill className="text-accent" size={25} onClick={handleClick} />
              )}
            </div>
          )
      }
    </>
  )
}