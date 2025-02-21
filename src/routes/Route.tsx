import RootLayout from "@/layout/RootLayout";
import Home from "@/pages/Home";
import Task from "@/pages/Task";
import UserPage from "@/pages/UserPage";
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
        path: "/task",
        element: <Task />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },
]);

export default router;
