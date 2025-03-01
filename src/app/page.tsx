"use client"

import { Task } from "@/types/task";
import { useEffect, useState } from "react";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA =>', data);
        setTasks(data);
      })
      .catch((error) => {
        console.log('ERROR =>', error);
      });
  }, [])
  return (
    <div>
      My Task Manager!
      <ul>
        {tasks.length > 0 && tasks.map((task) => (
          <li key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
