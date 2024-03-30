import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Board } from "./Board"

import { IBoardList } from "@/types/types"

import { useGetBoardsQuery } from "@/redux"

export const BoardsList = () => {

  const { data } = useGetBoardsQuery("board")
  
  return (
    <ScrollArea className="w-full whitespace-nowrap px-2">
        <div className="flex gap-4 space-x-4 p-4">
          {data?.map((item: IBoardList) => (
            <Board
              key={item.id}
              id={item.id}
              title={item.title}
              boardName={item.title}
              tasks={item.tasks}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}