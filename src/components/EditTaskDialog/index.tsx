"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import React, { useEffect, forwardRef, useImperativeHandle } from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Loader2, Pencil, Plus } from "lucide-react"
import { Task } from "@/types/task"
import { Textarea } from "../ui/textarea"

export interface EditTaskDialogHandles {
  openDialog: () => void;
  closeDialog: () => void;
}

interface EditTaskDialogProps {
  task: Task;
  onSubmit: (event: React.FormEvent<HTMLElement>, task: Task) => void;
  updateTaskPending: boolean;
}


export const EditTaskDialog = forwardRef<EditTaskDialogHandles, EditTaskDialogProps>(
  ({ task, onSubmit, updateTaskPending }, ref) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
      
    useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false),
    }));

    useEffect(() => {
      console.log("OPEN =>", open);
    }, [open])

    const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
      console.log("HERE!!!!!!!!!!!!")
      try {
        event.preventDefault();
        await onSubmit(event, task);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    }
  
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit a task</DialogTitle>
              <DialogDescription>
                Fill in the form below to edit the task.
              </DialogDescription>
            </DialogHeader>
            <Form task={task} onSubmit={handleSubmit} updateTaskPending={updateTaskPending} />
          </DialogContent>
        </Dialog>
      )
    }
  
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit task</DrawerTitle>
            <DrawerDescription>
              Fill in the form below to edit task.
            </DrawerDescription>
          </DrawerHeader>
          <Form task={task} onSubmit={handleSubmit} updateTaskPending={updateTaskPending} className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
)

interface FormProps extends React.ComponentProps<"form"> {
  updateTaskPending: boolean;
  task: Task;
}
 
const Form: React.FC<FormProps> = ({ className, onSubmit, updateTaskPending, task }) => {
  return (
    <form onSubmit={onSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2 mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          className="p-2 w-full border rounded-md mt-1"
          id="title"
          name="title"
          defaultValue={task.title}
          placeholder="Enter task title"
          readOnly={updateTaskPending}
          required
        />
      </div>
      <div className="grid gap-2 mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className="p-2 w-full border rounded-md mt-1 text-xs"
          id="description"
          name="description"
          defaultValue={task.description || ''}
          readOnly={updateTaskPending}
          rows={10}
          placeholder="Enter task description"
        ></Textarea>
      </div>
      <div className="grid gap-2 mb-4">
        <Label htmlFor="completed">Completed</Label>
        <Input
          type="checkbox"
          id="completed"
          name="completed"
          defaultChecked={task.completed}
          readOnly={updateTaskPending}
        />
      </div>
      <Button type="submit" disabled={updateTaskPending}>
        {updateTaskPending && <Loader2 className="animate-spin" />}
        Save
      </Button>
    </form>
  )
}