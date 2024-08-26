/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import AuthLayout from "@/layout/Auth";
import DashboardLayout from "@/layout/Dashboard";
import ScopeLibrary from "@/pages/scope-library";

const AuthLogin = Loadable(lazy(() => import("@/pages")));
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));
const Input = Loadable(lazy(() => import("@/pages/input")));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/input",
      element: <DashboardLayout />,
      children: [
        {
          path: "/input",
          element: <Input />,
        },
      ],
    },
    {
      path: "/scope-library",
      element: <DashboardLayout />,
      children: [
        {
          path: "/scope-library",
          element: <ScopeLibrary />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
