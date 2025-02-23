import { ReactNode, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  User,
  Users,
  Package,
  CheckCircle,
} from "lucide-react"; // Added icons for admin options
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthSelector } from "@/hooks/useApp";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthSelector();

  // Check if the screen is mobile-sized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile devices
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Automatically collapse the sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  if (!user) return;

  return (
    <div
      className={`h-[calc(100vh-64px)] px-1 md:px-3 bg-gray-700 border-r transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="items-center justify-between p-4 hidden md:flex border-b border-gray-600">
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
          {user?.role === "User" && (
            <>
              {/* Common Options for All Roles */}
              <NavItem
                icon={<ShoppingCart size={18} className="text-white" />}
                text="View Orders"
                isCollapsed={isCollapsed}
                isSelected={location.pathname === "/dashboard/user/view-orders"}
                onClick={() => navigate(`/dashboard/user/view-orders`)}
              />
              <NavItem
                icon={<User size={18} className="text-white" />}
                text="Manage Profile"
                isCollapsed={isCollapsed}
                isSelected={location.pathname === "/dashboard/user"}
                onClick={() => navigate(`/dashboard/user`)}
              />
            </>
          )}

          {/* Admin-Specific Options */}
          {user?.role === "Admin" && (
            <>
              <NavItem
                icon={<CheckCircle size={18} className="text-white" />}
                text="Approve Orders"
                isCollapsed={isCollapsed}
                isSelected={location.pathname === "/dashboard/admin"}
                onClick={() => navigate("/dashboard/admin")}
              />
              <NavItem
                icon={<Users size={18} className="text-white" />}
                text="Manage Users"
                isCollapsed={isCollapsed}
                isSelected={
                  location.pathname === "/dashboard/admin/manage-users"
                }
                onClick={() => navigate("/dashboard/admin/manage-users")}
              />
              <NavItem
                icon={<Package size={18} className="text-white" />}
                text="Manage Products"
                isCollapsed={isCollapsed}
                isSelected={
                  location.pathname === "/dashboard/admin/manage-products"
                }
                onClick={() => navigate("/dashboard/admin/manage-products")}
              />
            </>
          )}
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
