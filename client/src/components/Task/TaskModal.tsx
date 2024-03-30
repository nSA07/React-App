import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Eye, Tag, Crosshair, CalendarIcon  } from "lucide-react"

import { IHistory } from "@/types/types";
import { typeFunction } from "@/types/enums";

export const TaskModal = ({boardName, historyById, title, description, priority, createDate}) => {
    
    const data = [];
    function historyItem (item: IHistory) {
        item?.map(({ changes }) => {
            changes?.map(({field, prev, next, taskName, boardName, dueData, taskId}) => {                
                data.push({title: typeFunction[field](prev, next, taskName, boardName, dueData, taskId)});
            })
        });
    }
    historyItem(historyById);

    return (
        <Dialog>
            <DialogTrigger asChild className="relative top-[1px] left-[85%]">
                <Eye className="pointer" />
            </DialogTrigger>
            <DialogContent className="max-w-[90%] h-[90%] m-4 p-0">
                <div className="flex">
                    <div className="flex flex-col gap-5 p-8 w-[50%]">
                        <h2 className="font-bold text-3xl leading-none tracking-tight">{title}</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex w-[300px] justify-between">
                                <p className="text-[#c9c5c5] flex gap-1 text-center">
                                    <Crosshair size={20} color="#c9c5c5" />
                                    <span>Status</span>
                                </p>
                                <p className="font-semibold">{boardName}</p>
                            </div>
                            <div className="flex w-[300px] justify-between">
                                <p className="text-[#c9c5c5] flex gap-1 text-center">
                                    <CalendarIcon size={20} color="#c9c5c5" />
                                    <span>Due data</span>
                                </p>
                                <p className="font-semibold">{createDate}</p>
                            </div>
                            <div className="flex w-[300px] justify-between">
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
                    <div className="flex flex-col gap-5 w-[50%] bg-slate-100 p-8">
                        <span className="text-xl font-bold">Activity</span>
                        <ul className="p-2 flex flex-col gap-3">
                            {data?.map((item) => (item.title))}
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
