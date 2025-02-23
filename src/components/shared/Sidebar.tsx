import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-[calc(100vh-64px)] px-3 bg-gray-700 border-r transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hover:bg-gray-600"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-white" />
          ) : (
            <ChevronLeft size={20} className="text-white" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-4">
        <ul className="space-y-1">
          <NavItem
            icon={<ShoppingCart size={18} className="text-white" />}
            text="View Orders"
            isCollapsed={isCollapsed}
            isSelected={location.pathname === "/dashboard/user/view-orders"}
            onClick={() => navigate("/dashboard/user/view-orders")}
          />
          <NavItem
            icon={<User size={18} className="text-white" />}
            text="Manage Profile"
            isCollapsed={isCollapsed}
            isSelected={location.pathname === "/dashboard/user"}
            onClick={() => navigate("/dashboard/user")}
          />
        </ul>
      </nav>
    </div>
  );
};
interface NavItemProps {
  icon: ReactNode;
  text: string;
  isCollapsed: boolean;
  isSelected: boolean;
  onClick: () => void;
}

// Reusable NavItem Component
const NavItem = ({
  icon,
  text,
  isCollapsed,
  isSelected,
  onClick,
}: NavItemProps) => {
  return (
    <li className="mb-3">
      <Button
        variant="ghost"
        className={`w-full justify-start ${
          isCollapsed ? "px-3" : "px-4"
        } hover:bg-gray-600 ${isSelected ? "bg-gray-600" : "bg-transparent"}`}
        onClick={onClick}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!isCollapsed && (
          <span className="ml-3 text-sm font-medium text-white">{text}</span>
        )}
      </Button>
    </li>
  );
};

export default Sidebar;
