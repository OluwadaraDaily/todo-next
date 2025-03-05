import { Button } from "@/components/ui/button"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuGroup,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuPortal,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/types/task";
import { MoreVertical, Pencil } from "lucide-react";


const CustomDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-0 px-2 bg-transparent border-0 shadow-none hover:bg-white">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuItem className="flex items-center justify-between gap-4">
          Edit
          <Pencil size={12} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-4 text-red-500 hover:text-red-500">
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ITaskItem {
  task: Task;
}

export const TaskItem = ({ task }: ITaskItem) => {
  return (
    <li key={task.id} className="w-full p-2 rounded-md bg-gray-100 mb-4 flex items-center justify-between">
      {task.title}
      <span>
        <CustomDropdownMenu />
      </span>
    </li>
  )
}