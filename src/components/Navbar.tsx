import { Link } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3 px-5">
      <div className="flex items-center">
        <span className="font-bold ml-2">Task</span> Master
      </div>
      <div className="flex gap-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/task"}>Task</Link>
        <Link to={"/user"}>User</Link>
      </div>

      <div>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
