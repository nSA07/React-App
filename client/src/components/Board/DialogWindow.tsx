import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { IDialogProps } from "@/types/types"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const DialogWindow: FC<IDialogProps> = ({ 
        icon,
        dialogBtm,
        dialogTitle,
        dialogDescr,
        varantBtm,
        size,
        placeholder,
        handleDialog
    }) => {
    const [ open, setOpen ] = useState(false)

    const formSchema = z.object({
            title: z.string().min(2, {
            message: "Field must be at least 2 characters.",
        }),
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
    
    const onSubmit = (values: { title: string }) => {
        handleDialog(values, form, setOpen)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={varantBtm} size={size} className="flex gap-2 font-medium">
                    {icon}
                    {dialogBtm}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescr}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-center gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <Label htmlFor="title" className="text-right">
                                            Name board
                                        </Label>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                placeholder={placeholder}
                                                className="col-span-3 w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Save</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
