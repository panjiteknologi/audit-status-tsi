/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import AuthLayout from "@/layout/Auth";
import DashboardLayout from "@/layout/Dashboard";

const TokenHandler = Loadable(lazy(() => import("@/routes/TokenHandler")));
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <TokenHandler />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
