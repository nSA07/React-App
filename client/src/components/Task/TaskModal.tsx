import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Eye, Tag, Crosshair, CalendarIcon  } from "lucide-react"

import { IHistory } from "@/types/types";
import { typeFunction } from "@/components/History/History";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { TaskDialog } from "./TasksDialog";
import { useState } from "react";

export const TaskModal = ({id, boardName, historyById, title, description, priority, createDate}) => {
    const [ openDialog, setOpenDialog ] = useState(false)
    const data = [];
    function historyItem (item: IHistory) {
        item?.map(({ changes }) => {
            changes?.map(({field, prev, next, taskName, boardName, dueData}) => {                
                data.push({title: typeFunction[field](prev, next, taskName, boardName, dueData)});
            })
        });
    }
    console.log(historyById);
    
    historyItem(historyById);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild className="relative top-[1px] left-[85%]">
                <Eye className="pointer" />
            </DialogTrigger>
            <DialogContent className="max-w-[90%] h-[90%] m-4 p-0 ">
                <div className="left-[65%] md:left-[35%] md:top5 top-8 fixed rounded-sm border px-4">
                    <TaskDialog
                        id={id}
                        variant={"ghost"}
                        size="boardBtm"
                        setOpen={setOpenDialog}
                        title={title}
                        description={description}
                        priority={priority}
                    />
                </div>
                <div className="md:flex justify-center">
                    <div className="flex flex-col gap-5 p-8 md:w-[50%] w-full">
                        <h2 className="font-bold text-3xl leading-none tracking-tight">{title}</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex w-full md:w-[300px] justify-between">
                                <p className="text-[#c9c5c5] flex gap-1 text-center">
                                    <Crosshair size={20} color="#c9c5c5" />
                                    <span>Status</span>
                                </p>
                                <p className="font-semibold">{boardName}</p>
                            </div>
                            <div className="flex w-full md:w-[300px]  justify-between">
                                <p className="text-[#c9c5c5] flex gap-1 text-center">
                                    <CalendarIcon size={20} color="#c9c5c5" />
                                    <span>Due data</span>
                                </p>
                                <p className="font-semibold">{createDate}</p>
                            </div>
                            <div className="flex w-full md:w-[300px]  justify-between">
                                <p className="text-[#c9c5c5] flex gap-1 text-center">
                                    <Tag size={20} color="#c9c5c5" />
                                    <span>Priority</span>
                                </p>
                                <p className="font-semibold">{priority}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xl">Description</span>
                            <p className="text-[#c9c5c5] text-sm">{description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:w-[50%] w-full bg-slate-100 p-8">
                        <span className="text-xl font-bold">Activity</span>
                        <ScrollArea className="w-full h-full p-4">
                            <ul className="p-2 flex flex-col gap-3">
                                {data?.map((item) => (item.title))}
                            </ul>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
