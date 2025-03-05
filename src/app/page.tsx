"use client"
import { IUpdateTaskData, Task } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { TaskService } from "@/services/tasks";
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import {AddTaskDialog, AddTaskDialogHandles} from "@/components/AddTaskDialog";
import { TaskItem } from "@/components/TaskItem";
import { EditTaskDialog, EditTaskDialogHandles } from "@/components/EditTaskDialog";
import { toast } from "sonner";


export default function Home() {
  const [currentTask, setCurrentTask] = React.useState<Task>({} as Task);
  const editDialogRef = useRef<EditTaskDialogHandles>(null);
  const addDialogRef = useRef<AddTaskDialogHandles>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    window.addEventListener("editTask", handleEditTask);

    return () => {
      window.removeEventListener("editTask", handleEditTask)
    }
  }, [])

  const clearForm = () => {
    const form = document.querySelector('form');
    if (form) {
      (form as HTMLFormElement).reset();
    }
  }

  // Query tasks
  const { data: tasks, isLoading: getTasksInitialLoading, isFetching: getTasksFetching, error, isPending } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: TaskService.fetchTasks
  });
  
  const { mutate, isPending: addTaskPending } = useMutation({
    mutationFn: TaskService.addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success("Success", {
        description: "Task created successfully"
      });
      addDialogRef?.current?.closeDialog();
      addDialogRef?.current?.clearForm();
    },
    onError: (error) => {
      toast.error("Error", {
        description: error?.message || "Failed to create task"
      });
    }
  })
  
  const { mutate: updateTask, isPending: updateTaskPending } = useMutation({
    mutationFn: TaskService.updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success("Success", {
        description: "Task updated successfully"
      });
      editDialogRef?.current?.closeDialog();
    },
    onError: (error) => {
      toast.error("Error", {
        description: error?.message || "Failed to update task"
      });
    }
  })

  
  // Form event handlers
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    mutate({
      title: form.get('title') as string,
      description: form.get('description') as string,
    });
  }
  
  const handleEditTask = (event: Event) => {
    const customEvent = event as CustomEvent<{ task: any }>;
    setCurrentTask(customEvent.detail.task);
    editDialogRef?.current?.openDialog();
  }
  
  const handleUpdate = (event: React.FormEvent<HTMLElement>, task: Task) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const updatedTask: IUpdateTaskData = {
      id: task.id,
      title: form.get('title') as string,
      description: form.get('description') as string,
      completed: form.get('completed') === 'on',
    }
    updateTask(updatedTask);
  }

  
  return (
    <main className="h-full">
      <section className="w-[90%] md:w-[80%] lg:max-w-[700px] mx-auto h-full my-8">
        <div className="flex justify-between items-center">
          <h1>My Task Manager</h1>
          <AddTaskDialog
            ref={addDialogRef}
            onSubmit={handleSubmit}
            addTaskPending={addTaskPending}
          />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h4 className="text-2xl">All tasks</h4>
            {getTasksFetching && <Loader2 className="animate-spin" />}
          </div>
          {getTasksInitialLoading ?
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-10 w-full lg:w-[70%]" />
              <Skeleton className="h-10 w-full lg:w-[70%]" />
              <Skeleton className="h-10 w-full lg:w-[70%]" />
              <Skeleton className="h-10 w-full lg:w-[70%]" />
            </div>
          : (
            <ul>
              {!!tasks && tasks.length > 0 && tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                />
              ))}
            </ul>
          )}
        </div>
        <EditTaskDialog
          ref={editDialogRef}
          task={currentTask}
          updateTaskPending={updateTaskPending}
          onSubmit={handleUpdate}
        />
      </section>
    </main>
  );
}
