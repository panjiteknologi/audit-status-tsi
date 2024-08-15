/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import AuthLayout from "@/layout/Auth";
import DashboardLayout from "@/layout/Dashboard";

const AuthLogin = Loadable(lazy(() => import("@/pages")));
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));
const Input = Loadable(lazy(() => import("@/pages/input")));

const router = createBrowserRouter(
  [
    {
      path: "/Login",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/input",
          element: <Input />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
