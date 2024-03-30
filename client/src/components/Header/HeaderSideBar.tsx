import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { RotateCcw  } from 'lucide-react'
import { IHistory } from "@/types/types";
import { typeFunction } from "@/types/enums";

export const HeaderSideBar = ({history}) => {     
console.log(history);

    const data = [];
    function historyItem (item: IHistory) {
        item?.map(({ changes }) => {
            changes?.map(({field, prev, next, taskName, boardName, dueData, taskId}) => {                
                data.push({title: typeFunction[field](prev, next, taskName, boardName, dueData, taskId)});
            })
        });
    }
    historyItem(history);
    
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
                <ul className="p-2 flex flex-col gap-3">
                    {data?.map((item) => (item.title))}
                </ul>
            </SheetContent>
        </Sheet>
    )
}
