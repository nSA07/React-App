import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useEditTasksMutation } from "@/redux"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FilePenLine } from 'lucide-react';
import { FC } from "react";

interface ITaskDialogProps {
    id: number;
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    size: "default" | "boardBtm" | "sm" | "lg" | "icon";
    title: string;
    description: string;
    priority: string;
    setOpen: (arg0: boolean) => void;
}

export const TaskDialog: FC<ITaskDialogProps> = ({id, title, description, variant, size, priority, setOpen}) => {
    const { toast } = useToast()
    const [ editTasks ] = useEditTasksMutation()

    const formSchema = z.object({
        title: z.string().min(2, {
        message: "Field must be at least 2 characters.",
        }),
        description: z.string(),
        priority: z.string({ required_error: "Please select an priority to display.",}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: `${title}`,
            description: `${description}`,
            priority: `${priority.toLowerCase()}`,
        },
    })

    const onSubmit = async (values) => {
        try {
            const newTask = {
                id: id,
                new_task: {
                    title: values.title,
                    description: values.description,
                    priority: values.priority,
                }
            }
            await editTasks(newTask).unwrap()
            form.reset()
            setOpen(false)
        } catch (error) {
            toast({
                title: `${error.status}`,
                description: `${JSON.stringify(error.data.message)}`,
            })
        } 
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={variant} size={size} className="w-full">
                <FilePenLine />
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
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
                                        Title
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder={"Title"}
                                            className="col-span-3 w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label htmlFor="description" className="text-right">
                                        Descriptions
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            placeholder={"Description"}
                                            className="col-span-3 w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label  className="text-right">
                                        Priority
                                    </Label>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger id="priority">
                                                <SelectValue placeholder="Low" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">Hight</SelectItem>
                                            </SelectContent>
                                        </Select>
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
