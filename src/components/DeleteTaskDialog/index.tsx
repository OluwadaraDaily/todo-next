import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { forwardRef, useImperativeHandle } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Task } from "@/types/task";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DeleteTaskDialogProps {
  task: Task;
  deleteTaskPending: boolean;
  onSubmit: (id: number) => void;
}

export interface DeleteTaskDialogHandles {
  openDialog: () => void;
  closeDialog: () => void;
}


export const DeleteTaskDialog = forwardRef<DeleteTaskDialogHandles, DeleteTaskDialogProps>(
  ({ task, deleteTaskPending, onSubmit }, ref) => {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)")

    useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false),
    }));

    const handleOnDelete = async (event: React.FormEvent<HTMLElement>) => {
      event.preventDefault();
      await onSubmit(task.id);
    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handleOnDelete}
                disabled={deleteTaskPending}
              >
                {deleteTaskPending && <Loader2 className="animate-spin" />}
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)