"use client"
import { Task, ITaskData } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { TaskService } from "@/services/tasks";


export default function Home() {

  const queryClient = useQueryClient();

  const clearForm = () => {
    const form = document.querySelector('form');
    if (form) {
      (form as HTMLFormElement).reset();
    }
  }

  const { data: tasks, isLoading, isFetching, error, isPending } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: TaskService.fetchTasks
  });

   const mutation = useMutation({
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
    console.log("TITLE =>", form.get('title'));
    console.log("DESCRIPTION =>", form.get('description'));
    mutation.mutate({
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
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="p-2 w-full border rounded-md mt-1"
              id="description"
              name="description"
            ></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md border">Save</button>
        </form>
        <ul>
          {!!tasks && tasks.length > 0 && tasks.map((task) => (
            <li key={task.id} className="w-full px-2 py-4 rounded-md bg-gray-100 mb-4">
              {task.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
