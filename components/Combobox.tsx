"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <ChevronDown className="w-5 h-5 text-light" />
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-main text-light border-1 border-[#3e4046]">
                <Command className="bg-main text-light"> 
                    <CommandList className="bg-main text-light">   
                        <CommandGroup className="text-light">
                            <CommandItem
                                className="data-[selected=true]:bg-surface
                                 data-[selected=true]:text-white"
                            >
                                /
                            </CommandItem>
                            <CommandItem
                                className="data-[selected=true]:bg-surface
                                 data-[selected=true]:text-white"
                            >
                                Help Center
                            </CommandItem>
                            <CommandItem
                                className="data-[selected=true]:bg-surface
                                 data-[selected=true]:text-white"
                            >
                                Leave Feedback
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
