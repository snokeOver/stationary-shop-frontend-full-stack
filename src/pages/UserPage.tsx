import { useUserSelector } from "@/hooks/useApp";

import { AddUserModal } from "@/components/user/AddUserModal";
import UserCard from "@/components/user/UserCard";

const UserPage = () => {
  const { users } = useUserSelector();
  //   const filter = useTodoFilterSelector();

  // console.log(users);

  return (
    <div className="max-w-6xl flex flex-col gap-8 mx-auto px-5 min-h-screen">
      <div className="flex justify-between items-center">
        <h1>Add User</h1>

        <AddUserModal />
      </div>

      {users.map((item, index) => (
        <UserCard key={index} user={item} />
      ))}
    </div>
  );
};

export default UserPage;
