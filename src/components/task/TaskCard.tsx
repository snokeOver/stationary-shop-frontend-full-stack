import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { deleteTodo, ITodo, toggleCompleteTodo } from "@/redux/taskSlice";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/useApp";

interface ITaskProps {
  todo: ITodo;
}

const TaskCard = ({ todo }: ITaskProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-green-500": todo.priority === "Low",
              "bg-yellow-500": todo.priority === "Medium",
              "bg-red-500": todo.priority === "High",
            })}
          ></div>
          <h1 className={`${todo.isComplete ? "line-through" : ""}`}>
            {todo.title}
          </h1>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Button
            onClick={() => dispatch(deleteTodo(todo.id))}
            variant={"link"}
            className="p-0 text-red-500"
          >
            <Trash2 />
          </Button>
          <Checkbox onClick={() => dispatch(toggleCompleteTodo(todo.id))} />
        </div>
      </div>
      <p className="text-sm text-gray-400">{todo.description}</p>

      <p className="text-sm text-gray-400">
        By: {todo.assignedUser ? todo.assignedUser : "No One"}
      </p>
    </div>
  );
};

export default TaskCard;
