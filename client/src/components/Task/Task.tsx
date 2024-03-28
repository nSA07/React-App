import { useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { TaskDialog } from "./TasksDialog"
import { TaskSelect } from "./TaskSelect"

import { CalendarIcon, EllipsisVertical, Trash2 } from "lucide-react"

import { formattedData } from "@/helpers/formattedData"
import { useDeleteTasksMutation } from "@/redux"

export const Task = ({id, title, description, createAt, priority}) => {

    const [ deleteTasks ] = useDeleteTasksMutation()
    const [ open, setOpen ] = useState(false)
    const { createDate } = formattedData(createAt)    
    
    const deleteProduct = async (id: number) => {
        await deleteTasks(id)
    }

    return (
        <Card className="w-72">
            <CardHeader>
                <div className="absolute contents">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="relative top-[25px] left-[95%]">
                        <EllipsisVertical />
                    </PopoverTrigger>
                    <PopoverContent>
                        <TaskDialog
                            id={id}
                            variant={"ghost"}
                            size="boardBtm"
                            setOpen={setOpen}
                            title={title}
                            description={description}
                            priority={priority}
                        />
                        <Button onClick={() => deleteProduct(id)} variant="ghost" size="boardBtm" className="text-[#f70202]">
                            <Trash2 color="#f70202" />
                            Delete
                        </Button>
                    </PopoverContent>
                </Popover>
                <CardTitle className="text-base text-wrap">
                    {title}
                </CardTitle>
                <CardDescription className="text-wrap">{description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button
                    variant="data"
                    size="data"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {createDate}
                </Button>
                <Badge
                    className="text-sm px-6 py-2 mt-3"
                    variant="secondary"
                >
                    {priority}
                </Badge>
            </CardContent>
            <CardFooter className="w-full">
                <div className="flex flex-col space-y-1.5 w-full">
                    <TaskSelect id={id} />
                </div>
            </CardFooter>
        </Card>
    )
}
