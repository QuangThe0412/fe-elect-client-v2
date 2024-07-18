"use client";

import { BsLock, BsFileLock, BsFillPersonFill } from 'react-icons/bs'
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

export function UserNav() {
  const { user, setUser } = useAuthStore((state: TypeUsers) => ({
    user: state.user,
    setUser: state.setUser,
  }))

  const { setCart } = useCartStore((state: TypeCartStore) => ({
    setCart: state.setCart,
  }))

  const [openDialogProfile, setOpenDialogProfile] = useState(false);
  const [openDialogChangePassword, setOpenDialogChangePassword] = useState(false);

  return (
    <>
      <DialogProfile open={openDialogProfile} onClose={() => setOpenDialogProfile(false)} />
      <ChangePassword open={openDialogChangePassword} onClose={() => setOpenDialogChangePassword(false)} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
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
              <BsFileLock className="mr-2 h-4 w-4" />
              <span>Đổi mật khẩu</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => {
            const { status } = await accountApiRequest.logout();
            if (status === 200) {
              setUser({} as TypeDataAccountRes)
              setCart({} as CartType)
            }
          }}>
            <BsLock className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}