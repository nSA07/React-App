import { FC } from "react"
import { Button } from "@/components/ui/button"

import { DialogWindow } from "./DialogWindow"
import { IBoardList } from "@/types/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

import { Task } from "../Task/Task"

import { EllipsisVertical, FilePenLine, Plus, Trash2 } from 'lucide-react';

import { useDeleteBoardMutation, useEditBoardMutation, useAddTasksMutation, useGetTasksQuery } from "@/redux"

export const Board:FC<IBoardList> = ({id, title, tasks}) => {
    const { toast } = useToast()

    const [ editBoard ] = useEditBoardMutation()
    const [ deleteBoard ] = useDeleteBoardMutation()
    const [ addTasks ] = useAddTasksMutation()

    const { data: tasksData } = useGetTasksQuery(`tasks?board=${id}`)


    const ranameBoard = async (
            values: {title: string},
            form: { reset: () => void; },
            setOpen: (arg0: boolean) => void
        ) => {
        try {
            const newBoardTitle = {
                id: id,
                new_title: {title: values.title}
            }
            await editBoard(newBoardTitle).unwrap()
            form.reset()
            setOpen(false)
        } catch (error) {
            toast({
                title: `${error.status}`,
                description: `${JSON.stringify(error.data.message)}`,
            })
        }   
    }

    const addNewTaks = async (id: number) => {
        const newTask = {
            title: "Edit title",
            description: "Edit descriptions",
            status: "done",
            priority: "low",
            board: +id
        }
        await addTasks(newTask);
    }

    const deleteProduct = async (id: number) => {
        await deleteBoard(id)
    }

    return (
        <div className="flex flex-col gap-4 shrink-0 w-72">
            <div className="flex justify-between px-1 py-3 border-y overflow-hidden rounded-md">
                <span>{title}</span>
                <div className="flex gap-1">
                    <span>{tasks.length}</span>
                    <Popover>
                        <PopoverTrigger>
                            <EllipsisVertical />
                        </PopoverTrigger>
                        <PopoverContent>
                            <DialogWindow
                                icon={<FilePenLine />}
                                dialogBtm={'Edit'}
                                dialogTitle={'Edit board'}
                                dialogDescr={'Edit board to your board list here. Click save when youre done.'}
                                varantBtm={'ghost'}
                                size={"boardBtm"}
                                placeholder={'Edit board name'}
                                handleDialog={ranameBoard}
                            />
                            <Button onClick={() => addNewTaks(id)} variant="ghost" size="boardBtm" className="w-full">
                                <Plus />
                                Add new card
                            </Button>
                            <Button onClick={() => deleteProduct(id)} variant="ghost" size="boardBtm" className="text-[#f70202]">
                                <Trash2 color="#f70202" />
                                Delete
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Button onClick={() => addNewTaks(id)} variant="outline" className="w-full">
                <Plus />
                Add new card
            </Button>
            <ScrollArea className="h-lvh w-full">
                <div className="flex flex-col gap-2">
                    {tasksData?.map((item) => (
                        <Task
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            createAt={item.createAt}
                            priority={item.priority} 
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

