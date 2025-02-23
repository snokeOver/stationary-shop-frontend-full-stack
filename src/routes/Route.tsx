import DashboardLayout from "@/layout/DashboardLayout";
import PrivateRoute from "@/layout/PrivateRoute";
import PublicRoute from "@/layout/PublicRoute";
import RootLayout from "@/layout/RootLayout";
import About from "@/pages/About";
import AllProduct from "@/pages/AllProduct";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ManageProfile from "@/pages/user/ManageProfile";
import ProductDetails from "@/pages/ProductDetails";
import Register from "@/pages/Register";
import ViewOrders from "@/pages/user/ViewOrders";

import { createBrowserRouter } from "react-router-dom";
import ManageOrders from "@/pages/admin/ManageOrders";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageProducts from "@/pages/admin/ManageProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/details",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-products",
        element: <AllProduct />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute role="User">
            <ManageProfile />,
          </PrivateRoute>
        ),
      },
      {
        path: "view-orders",
        element: (
          <PrivateRoute role="User">
            <ViewOrders />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute role="Admin">
            <ManageOrders />,
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute role="Admin">
            <ManageUsers />,
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="Admin">
            <ManageProducts />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
