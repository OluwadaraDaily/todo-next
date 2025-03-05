import { ITaskData, IUpdateTaskData } from "@/types/task";

const fetchTasks = async () => {
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const addTask = async (payload: ITaskData) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
}

const updateTask = async (payload: IUpdateTaskData) => {
  try {
    const response = await fetch(`/api/tasks/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
  
export const TaskService = {
  fetchTasks,
  addTask,
  updateTask
}