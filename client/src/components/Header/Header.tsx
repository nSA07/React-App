
import { DialogWindow } from "../Board/DialogWindow";
import { useToast } from "@/components/ui/use-toast"
import { HeaderSideBar } from "./HeaderSideBar";

import { Plus } from 'lucide-react'

import { useAddBoardMutation } from "@/redux"

export const Header = () => {

  const [ addBoard ] = useAddBoardMutation();
  const { toast } = useToast()

  const addNewBoard = async (values: {title: string}, form: { reset: () => void; }, setOpen: (arg0: boolean) => void) => {
    try {
      await addBoard({ title: values.title }).unwrap()
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
    <header className="flex justify-between items-center p-4">
      <h1 className="font-extrabold text-2xl">My Task Board</h1>
      <div className="flex gap-4">
        <HeaderSideBar />
        <DialogWindow
          icon={<Plus />}
          dialogBtm={'Create new list'}
          dialogTitle={'Create new list'}
          dialogDescr={'Create board to your board list here. Click save when youre done.'}
          varantBtm={'default'}
          size={'default'}
          placeholder={'Add board name'}
          handleDialog={addNewBoard}
        />
      </div>
    </header>
  )
}
