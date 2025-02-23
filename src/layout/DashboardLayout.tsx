import Navbar from "@/components/global/navSection/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-3 md:p-8 lg:p-10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
