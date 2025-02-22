import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";

import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileDropdownMenu } from "./ProfileDropMenu";
import { NavRightSheet } from "./NavRightSheet";
import { useAuthSelector } from "@/hooks/useApp";
import { ThemeSwitch } from "./ThemeSwitch";
import { CartSheet } from "./CartSheet";

const Navbar = () => {
  const { user } = useAuthSelector();

  return (
    <nav className=" mx-auto h-16 sticky top-0 z-50 flex w-full justify-center bg-gray-600">
      <div className="app-px app-max-w flex h-16 w-full items-center justify-between py-2 text-md">
        <div className="flex h-full items-center justify-start gap-5">
          <Link to="/" className="">
            <img
              src="./logo.png"
              alt="Snoke Stationary Logo"
              className="h-12 w-12"
            />
          </Link>

          <div className="hidden h-full w-[1px] min-w-[1px] rounded-sm bg-white xl:flex"></div>
          <div className="hidden xl:flex">
            <NavLinks />
          </div>
        </div>

        <div className="flex h-full items-center justify-start gap-5">
          <div className="hidden h-full w-[1px] min-w-[1px] rounded-sm bg-white text-xs xl:flex"></div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-4">
              <CartSheet />

              <ThemeSwitch />
            </div>
            {/* Search part */}

            {/* <SearchSheet /> */}
          </div>

          {/* Authentication & User Menu */}
          <div className="hidden xl:flex">
            {!user ? (
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
            ) : (
              <ProfileDropdownMenu>
                <Button className="flex items-center gap-3 rounded-sm  text-xs font-semibold uppercase   xl:px-5">
                  <CircleUserRound className="size-32" />
                  {user.name}
                </Button>
              </ProfileDropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="z-[100] flex xl:hidden">
            <NavRightSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
