import { Dot, Disc2  } from 'lucide-react'

export enum typeFunction {
    'added' = (prev, next, taskName: string, boardName: string, dueData: string, taskId: string) => 
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');
        if(!prev) {
            return <li className="text-slate-500 text-xs flex flex-col gap-2">
                <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                    <Dot size={16} />
                    You added <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{next}</span> to <span className="font-medium">{boardName}</span>
                </div>
                <span className="pl-5 italic">{currentData}</span>
            </li>;
        } else null;
    },
    'title' = (prev: string, next: string, taskName: string, _, dueData: string, taskId: string) =>
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');

        return <li className="text-slate-500 text-xs flex flex-col gap-2">
            <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                <Dot size={16} />
                You renamed <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{prev}</span> to <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{next}</span>
            </div>
            <span className="pl-5 italic">{currentData}</span>
        </li>;
    },
    'description' = (prev: string, next: string, taskName: string, _, dueData: string, taskId: string) => 
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');
        return <li className="text-slate-500 text-xs flex flex-col gap-2">
            <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                <Dot size={16} />
                You changed description <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{taskName}</span> from <span className="font-medium">{prev}</span> to <span className="font-medium">{next}</span>
            </div>
            <span className="pl-5 italic">{currentData}</span>
        </li>;
    },
    'priority' = (prev: string, next: string, taskName: string, _, dueData: string, taskId: string) => 
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');
        return <li className="text-slate-500 text-xs flex flex-col gap-2">
            <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                <Dot size={16} />
                You changed property <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{taskName}</span> from <span className="font-medium">{prev}</span> to <span className="font-medium">{next}</span>
            </div>
            <span className="pl-5 italic">{currentData}</span>
        </li>;
    },
    'board' = (prev, next, taskName: string, _, dueData: string, taskId: string) => 
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');
        return <li className="text-slate-500 text-xs flex flex-col gap-2">
            <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                <Dot size={16} />
                You moved <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{taskName}</span> from <span className="font-medium">{prev}</span> to <span className="font-medium">{next}</span>
            </div>
            <span className="pl-5 italic">{currentData}</span>
        </li>;
    },
    'remove' = (prev, next, taskName: string, boardName: string, dueData: string, taskId: string) => 
    {
        const currentData = dueData.split(' ').slice(0, 5).join(' ');
        if(!next) {
            return <li className="text-slate-500 text-xs flex flex-col gap-2">
                <div className="text-slate-500 text-xs flex gap-1 items-center flex-wrap">
                    <Dot size={16} />
                    You removed <Disc2 size={10} strokeWidth={4} /> <span className="font-bold">{prev}</span> from <span className="font-medium">{boardName}</span>
                </div>
                <span className="pl-5 italic">{currentData}</span>
            </li>;
        } else null;
    },
}