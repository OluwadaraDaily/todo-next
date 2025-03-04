"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import React from "react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Loader2, Plus } from "lucide-react"

interface AddTaskProps {
  onSubmit: (event: React.FormEvent<HTMLElement>) => void;
  addTaskPending: boolean;
}


export default function AddTask({ onSubmit, addTaskPending }: AddTaskProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    try {
      event.preventDefault();
      await onSubmit(event);
      document.querySelector('form')?.reset();
      setOpen(false);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  }
 
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Create new task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a task</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new task.
            </DialogDescription>
          </DialogHeader>
          <Form onSubmit={handleSubmit} addTaskPending={addTaskPending} />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">
          <Plus /> Create new task
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create a task</DrawerTitle>
          <DrawerDescription>
            Fill in the form below to create a new task.
          </DrawerDescription>
        </DrawerHeader>
        <Form onSubmit={handleSubmit} addTaskPending={addTaskPending} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface FormProps extends React.ComponentProps<"form"> {
  addTaskPending: boolean;
}
 
const Form: React.FC<FormProps> = ({ className, onSubmit, addTaskPending }) => {
  return (
    <form onSubmit={onSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2 mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          className="p-2 w-full border rounded-md mt-1"
          id="title"
          name="title"
          placeholder="Enter task title"
          readOnly={addTaskPending}
          required
        />
      </div>
      <div className="grid gap-2 mb-4">
        <label htmlFor="description">Description</label>
        <textarea
          className="p-2 w-full border rounded-md mt-1 text-xs"
          id="description"
          name="description"
          readOnly={addTaskPending}
          rows={10}
          placeholder="Enter task description"
        ></textarea>
      </div>
      <Button type="submit" disabled={addTaskPending}>
        {addTaskPending && <Loader2 className="animate-spin" />}
        Save
      </Button>
    </form>
  )
}