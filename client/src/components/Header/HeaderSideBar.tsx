import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { RotateCcw  } from 'lucide-react'

import { useGetHistoryQuery } from "@/redux"

export const HeaderSideBar = () => {

    const { data } = useGetHistoryQuery("history")

    console.log(data);
    

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="flex gap-2 font-medium">
                    <RotateCcw />
                    History
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>History</SheetTitle>
                <SheetDescription>
                {data?.map((item) => (
                    <ul key={item.id}>
                        <li>You added {item.entityType} to the {item.boardName}</li>
                    </ul>
                ))}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}
