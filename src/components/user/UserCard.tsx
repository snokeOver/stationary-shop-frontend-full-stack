import { deleteUser, IUser } from "@/redux/userSlice";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/hooks/useApp";

interface IUserkProps {
  user: IUser;
}

const UserCard = ({ user }: IUserkProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className={"size-3 rounded-full"}></div>
          <h1>{user.name}</h1>
        </div>
        <Button
          onClick={() => dispatch(deleteUser(user.name))}
          variant={"link"}
          className="p-0 text-red-500"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
