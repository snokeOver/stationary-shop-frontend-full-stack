import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "./nav.const";

const NavLinks = () => {
  // Dummy authentication data
  const isLoggedIn = true; // Change this based on your actual logic
  const user = { role: "fan" }; // Example user role
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-0">
      {navLinks.map((item) => {
        // Hide certain links based on authentication and role
        if (
          (!isLoggedIn && ["/dashboard", "/profile"].includes(item.url)) ||
          (isLoggedIn &&
            user.role === "fan" &&
            ["/dashboard", "/profile"].includes(item.url)) ||
          (isLoggedIn && ["/login", "/register"].includes(item.url)) // Hide login/register if logged in
        ) {
          return null;
        }

        return (
          <Link
            key={item.url}
            to={item.url}
            target={item.new_tab ? "_blank" : "_self"}
            className={cn(
              "m-2 flex text-xs font-semibold uppercase text-white hover:underline lg:ml-5",
              {
                "text-theme-400": pathname === item.url,
              }
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
