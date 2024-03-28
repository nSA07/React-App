import { useGetBoardsQuery, useEditTasksMutation } from "@/redux"

import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { IBoardList } from "@/types/types"

export const TaskSelect = ({id}: {id: number}) => {

    const { toast } = useToast()
    const [ editTasks ] = useEditTasksMutation()
    const { data: allBoards } = useGetBoardsQuery("board")

    const changeBoard = async (boardId: string, id: number) => {
        try {
            const newTask = {
                id: id,
                new_task: {
                    board: boardId
                }
            }
            await editTasks(newTask).unwrap()
        } catch (error) {
            toast({
                title: `${error.status}`,
                description: `${JSON.stringify(error.data.message)}`,
            })
        }
    }

    return (
        <Select onValueChange={(values) => changeBoard(values, id)}>
            <SelectTrigger>
                <SelectValue placeholder="Move to" />
            </SelectTrigger>
            <SelectContent position="popper">
                {allBoards?.map((item: IBoardList) => (
                    <SelectItem key={item.id} value={`${item.id}`}>{item.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
