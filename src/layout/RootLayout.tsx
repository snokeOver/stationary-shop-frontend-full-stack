import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/navSection/Navbar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
