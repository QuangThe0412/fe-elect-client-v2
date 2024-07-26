"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { defaultSort, sorting } from "@/lib/constants"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

export function Filter() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [filter, setFilter] = useState(defaultSort.title)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const HandleOnSelect = (sortType: string) => {
        const sortTypeParam = searchParams.get('sortType')
        if (sortTypeParam !== sortType) {
            router.push(pathname + '?' + createQueryString('sortType', sortType))
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {filter}
                    <MdOutlineKeyboardArrowDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                    {
                        sorting.map((item) => (
                            <DropdownMenuRadioItem key={item.sortType} value={item.title}
                                onSelect={() => HandleOnSelect(item.sortType)}>
                                {item.title}
                            </DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
