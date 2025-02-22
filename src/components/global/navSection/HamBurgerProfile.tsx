import { useAuthSelector } from "@/hooks/useApp";
import { CircleUserRound } from "lucide-react";

const HamBurgerProfile = () => {
  const { user } = useAuthSelector();

  if (!user) return null; // If no user data, don't render anything

  return (
    <div className=" mt-2 flex items-center gap-2 rounded-full p-2 text-white">
      <CircleUserRound className="size-12" />

      <div className="h-full gap-2 text-start">
        <h2 className="text-sm font-semibold uppercase text-white md:text-md">
          {user.name}
        </h2>
        <p className="text-xxs md:text-sm">{user.email}</p>
      </div>
    </div>
  );
};

export default HamBurgerProfile;
