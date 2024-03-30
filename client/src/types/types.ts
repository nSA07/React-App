import { ReactNode } from "react"

export interface IDialogProps {
    icon: ReactNode;
    dialogBtm: string;
    dialogTitle: string;
    dialogDescr: string;
    variantBtm: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    size: "default" | "boardBtm" | "sm" | "lg" | "icon";
    placeholder: string;
    handleDialog: (values: {title: string;}, form: { reset: () => void; }, setOpen: (arg0: boolean) => void) => void
}

export interface IBoardList {
    id: number;
    title: string;
    boardName: string;
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

export interface IHistoryValue {
    [key: string]: string;
}
  
export interface IHistory {
    map(arg0: ({ changes }: { changes: IHistoryValue[]; }) => void): unknown;
    id: number;
    timestamp: Date;
    stringValues: IHistoryValue[];
}