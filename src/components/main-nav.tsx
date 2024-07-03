import Link from "next/link"
import {
  Menu,
  Hammer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { paths } from "@/constants/paths"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href={paths.home} className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Hammer className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link href={paths.home} className="text-foreground transition-colors hover:text-foreground">
          Home
        </Link>
        <Link href={paths.products} className="text-muted-foreground transition-colors hover:text-foreground">
          Products
        </Link>
        <Link href={paths.login} className="text-muted-foreground transition-colors hover:text-foreground">
          Login
        </Link>
        <Link href={paths.register} className="text-muted-foreground transition-colors hover:text-foreground">
          Register
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href={paths.home} className="flex items-center gap-2 text-lg font-semibold">
              <Hammer className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href={paths.products} className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link href={paths.register} className="text-muted-foreground hover:text-foreground">
              Register
            </Link>
            <Link href={paths.login} className="text-muted-foreground hover:text-foreground">
              Login
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}