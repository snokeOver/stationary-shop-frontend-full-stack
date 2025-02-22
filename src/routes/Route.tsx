import PublicRoute from "@/layout/PublicRoute";
import RootLayout from "@/layout/RootLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Register from "@/pages/Register";

import { createBrowserRouter } from "react-router-dom";

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
]);

export default router;
