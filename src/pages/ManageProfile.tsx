import { useAuthSelector } from "@/hooks/useApp";

const ManageProfile = () => {
  const { user } = useAuthSelector();
  return <div>Manage Profile</div>;
};

export default ManageProfile;
