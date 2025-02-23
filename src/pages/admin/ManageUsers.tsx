import LoadingSection from "@/components/global/LoadingSection";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useUserActivationToggleMutation,
} from "@/redux/features/auth/authApi";
import { IManageUser } from "@/types";
import { useAuthSelector } from "@/hooks/useApp";

export default function ManageUsers() {
  const { data, error, isLoading } = useGetAllUsersQuery(undefined);
  const { user } = useAuthSelector();
  const [toggleUserActivation] = useUserActivationToggleMutation();
  if (isLoading) return <LoadingSection />;
  if (error) return <div>Error occurred in getting users</div>;

  // Handle deactivate user
  const handleDeactivateUser = async (email: string) => {
    try {
      const res = await toggleUserActivation(email).unwrap();

      if (res.status) toast(`User ${res.data.status} successfully`);
    } catch (error) {
      console.error("Failed to deactivate user:", error);
    }
  };
  if (!user) return;
  return (
    <div className="w-[300px] sm:w-full mx-auto md:p-4">
      <Table>
        <TableCaption className="text-gray-600 dark:text-gray-400"></TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className=" text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((curUser: IManageUser, index: number) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {curUser.name.toUpperCase()}
              </TableCell>
              <TableCell className="text-gray-900 dark:text-gray-100">
                {curUser.email}
              </TableCell>
              <TableCell>
                <Badge
                  variant={curUser.role === "Admin" ? "default" : "outline"}
                  className="whitespace-nowrap"
                >
                  {curUser.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    curUser.status === "Active" ? "secondary" : "destructive"
                  }
                  className="whitespace-nowrap"
                >
                  {curUser.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleDeactivateUser(curUser.email)}
                  className={`${
                    curUser.status === "Active"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white ${user.email === curUser.email ? "hidden" : ""}`}
                >
                  {curUser.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
