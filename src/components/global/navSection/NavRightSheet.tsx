import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import NavLinksHamburger from "./NavLinksHamburget";
import HamBurgerProfile from "./HamBurgerProfile";
import { Description, DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";

import useLogout from "@/hooks/userLogout";
import { useAuthSelector } from "@/hooks/useApp";

export function NavRightSheet() {
  const logout = useLogout();
  const { user } = useAuthSelector();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="size-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <DialogTitle></DialogTitle>
        <Description />
        <div className="h-full flex flex-col justify-between gap-10">
          <div>
            <div className="p-4">
              <HamBurgerProfile />
            </div>
            <div className="p-4 pl-0">
              <NavLinksHamburger />
            </div>

            {user && (
              <>
                <div className="mr-5 border-t-2 border-[#f8f8f816]"></div>
                <div
                  onClick={() => logout()}
                  className="w-full text-white cursor-pointer p-4 px-6 text-start text-xs font-semibold uppercase"
                >
                  Log out
                </div>
              </>
            )}
          </div>

          <div className="m-4 flex flex-col items-center justify-center gap-5 text-center text-[10px]">
            <div className="w-full">
              {!user && (
                <Link to="/login">
                  <Button className="w-full rounded-sm text-md font-semibold uppercase  ">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
