import { ReactNode } from "react"

export interface IDialogProps {
    icon: ReactNode;
    dialogBtm: string;
    dialogTitle: string;
    dialogDescr: string;
    varantBtm: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    size: "default" | "boardBtm" | "sm" | "lg" | "icon";
    placeholder: string;
    handleDialog: (values: {title: string;}, form: { reset: () => void; }, setOpen: (arg0: boolean) => void) => void
}

export interface IBoardList {
    id: number;
    title: string;
    tasks: ITask[];
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    createAt: string;
    priority: string;
    status: string;
}