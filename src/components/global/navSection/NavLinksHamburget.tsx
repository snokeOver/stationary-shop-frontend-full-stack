import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "./nav.const";

const NavLinksHamburger = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:gap-0">
      {navLinks.map((item) => {
        // Restrict pages for logged-out users
        if (!isLoggedIn && ["/dashboard", "/profile"].includes(item.url)) {
          return null;
        }

        return (
          <Link
            key={item.url}
            to={item.url}
            target={item.new_tab ? "_blank" : "_self"}
            className={`m-2 flex text-xs font-semibold uppercase text-white hover:underline xl:ml-5 xl:hidden ${
              location.pathname === item.url
                ? "rounded-br-3xl rounded-tr-sm bg-[#1b1b35] py-2"
                : ""
            }`}
          >
            <span className="ml-4">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinksHamburger;
