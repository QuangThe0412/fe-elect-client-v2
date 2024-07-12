import Link from "next/link"
import {
  Menu,
  Hammer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { paths } from "@/constants/paths"
import NavLink from "./link-custom"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav className="hidden md:flex md:items-center md:flex-row gap-6 text-lg font-medium md:text-sm md:gap-5 lg:gap-6">
        <Link href={paths.home}>
          <Hammer className="h-6 w-6" />
        </Link>
        <NavLink href={paths.home}>Trang chủ</NavLink>
        <NavLink href={paths.products}>Sản phẩm</NavLink>
        <NavLink href={paths.login}>login</NavLink>
        <NavLink href={paths.register}>register</NavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href={paths.home}>
              <Hammer className="h-6 w-6" />
            </Link>
            <NavLink href={paths.products}>Sản phẩm</NavLink>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}