import { AddTaskModal } from "@/components/task/AddTaskModal";
import TaskCard from "@/components/task/TaskCard";
import {
  useAppDispatch,
  //   useTodoFilterSelector,
  useTodoSelector,
} from "@/hooks/useApp";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITodo, updateFilter } from "@/redux/taskSlice";
import { useGetTasksQuery } from "@/redux/api/baseAPI";

const Task = () => {
  // const todos = useTodoSelector();

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetTasksQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div className="max-w-6xl flex flex-col gap-8 mx-auto px-5 min-h-screen">
      <div className="flex justify-between items-center">
        <h1>Task</h1>

        <AddTaskModal />
      </div>
      <div>
        <Tabs defaultValue="All" className="w-[400px]">
          <TabsList>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("All"))}
              value="All"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("Low"))}
              value="Low"
            >
              Low
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("Medium"))}
              value="Medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              onClick={() => dispatch(updateFilter("High"))}
              value="High"
            >
              High
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {!isLoading &&
        data.tasks.map((todo: ITodo, index: number) => (
          <TaskCard key={index} todo={todo} />
        ))}
    </div>
  );
};

export default Task;
