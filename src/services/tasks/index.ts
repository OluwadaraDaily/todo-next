import { ITaskData } from "@/types/task";

const fetchTasks = async () => {
  try {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    console.log('DATA [FETCH TASKS] =>', data);
    return data;
  } catch (error) {
    console.log('ERROR [FETCH TASKS] =>', error);
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

      console.log("response =>", response);

      const data = await response.json();
      console.log("ADD TASK COMPLETE =>", data);
      return data;
    } catch (error) {
      console.log("ERROR [ADD TASK] =>", error);
      throw error;
    }
}
  
export const TaskService = {
  fetchTasks,
  addTask,
}