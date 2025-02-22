import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthSelector } from "@/hooks/useApp";
import useLogout from "@/hooks/userLogout";

import { IChildrenProps } from "@/types";

export function ProfileDropdownMenu({ children }: IChildrenProps) {
  const { user } = useAuthSelector();
  const logout = useLogout();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 space-y-2 rounded-br-3xl border-0  p-4">
        <DropdownMenuLabel className="flex items-center gap-2 text-white">
          <CircleUserRound className="size-12" />

          <div className="flex h-full flex-col justify-between">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem className="rounded-br-3xl py-2">
          <Link to="/profile/update" className="w-full text-sm uppercase">
            Edit Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-br-3xl py-2">
          <span
            onClick={() => logout()}
            className="w-full cursor-pointer text-sm uppercase"
          >
            Log Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
