"use client"
import { Task } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { TaskService } from "@/services/tasks";
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"


export default function Home() {

  const queryClient = useQueryClient();

  const clearForm = () => {
    const form = document.querySelector('form');
    if (form) {
      (form as HTMLFormElement).reset();
    }
  }

  const { data: tasks, isLoading: getTasksInitialLoading, isFetching: getTasksFetching, error, isPending } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: TaskService.fetchTasks
  });

   const { mutate, isPending: addTaskPending } = useMutation({
    mutationFn: TaskService.addTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      clearForm();
    },
    onError: (error) => {
      console.log('ERROR [ADD TASK] =>', error);
    }
   })
  
  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    mutate({
      title: form.get('title') as string,
      description: form.get('description') as string,
    });
  }

  return (
    <main className="h-full">
      <section className="w-[90%] md:w-[80%] lg:max-w-[1000px] mx-auto h-full my-8">
        <div className="flex justify-between items-center">
          <h1>My Task Manager</h1>
          <button className="px-4 py-2 rounded-md border" disabled>
            Create a new task
          </button>
        </div>
        <form onSubmit={handleSubmit} className="my-8 border p-8">
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="p-2 w-full border rounded-md mt-1"
              id="title"
              name="title"
              readOnly={addTaskPending}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="p-2 w-full border rounded-md mt-1"
              id="description"
              name="description"
              readOnly={addTaskPending}
            ></textarea>
          </div>
          <Button type="submit" disabled={addTaskPending}>
            {addTaskPending && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </form>
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
                <li key={task.id} className="w-full px-2 py-4 rounded-md bg-gray-100 mb-4">
                  {task.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
