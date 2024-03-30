
import { DialogWindow } from "../Board/DialogWindow";
import { useToast } from "@/components/ui/use-toast"
import { HeaderSideBar } from "./HeaderSideBar";

import { Plus } from 'lucide-react'

import { useAddBoardMutation, useGetHistoryQuery } from "@/redux"

export const Header = () => {

  const [ addBoard ] = useAddBoardMutation();
  const { data: history, error, isLoading } = useGetHistoryQuery("history") 
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
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : history ? (
          <HeaderSideBar history={history} />
        ) : null}
        <DialogWindow
          icon={<Plus />}
          dialogBtm={'Create new list'}
          dialogTitle={'Create new list'}
          dialogDescr={'Create board to your board list here. Click save when youre done.'}
          variantBtm={'default'}
          size={'default'}
          placeholder={'Add board name'}
          handleDialog={addNewBoard}
        />
      </div>
    </header>
  )
}
