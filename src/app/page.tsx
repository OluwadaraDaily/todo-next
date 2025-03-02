"use client"

import { Task } from "@/types/task";
import React, { useEffect, useState } from "react";

const fetchTasks = async () => {
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('ERROR =>', error);
    return [];
  }
}


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowAddTaskForm(tasks.length === 0);
    }
  }, [tasks]);

  const addTask = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          completed: false,
        }),
      });
      const data = await response.json();
      console.log('DATA [ADD TASK] =>', data);
      setShowAddTaskForm(false);
    } catch (error) {
      console.log('ERROR =>', error);
    }
  }

  return (
    <main className="h-full">
      <section className="w-[90%] md:w-[80%] lg:max-w-[1000px] mx-auto h-full my-8">
        <div className="flex justify-between items-center">
          <h1>My Task Manager</h1>
          <button className="px-4 py-2 rounded-md border" onClick={() => setShowAddTaskForm(true)}>
            Create a new task
          </button>
        </div>
        {showAddTaskForm !== null && showAddTaskForm &&
          <form onSubmit={addTask}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="p-3 border rounded-md mt-1"
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                id="title"
                name="title"
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="p-3 border rounded-md mt-1"
                id="description"
                name="description"
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="px-4 py-2 rounded-md border mt-2">Save</button>
          </form>
        }
        <ul>
          {tasks.length > 0 && tasks.map((task) => (
            <li key={task.id}>
              {task.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
