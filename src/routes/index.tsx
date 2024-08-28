/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import AuthLayout from "@/layout/Auth";
import DashboardLayout from "@/layout/Dashboard";
import ScopeLibrary from "@/pages/scope-library";

const AuthLogin = Loadable(lazy(() => import("@/pages")));
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));
const ISO = Loadable(lazy(() => import("@/pages/iso")));
const ISPO = Loadable(lazy(() => import("@/pages/ispo")));

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
      path: "/iso",
      element: <DashboardLayout />,
      children: [
        {
          path: "/iso",
          element: <ISO />,
        },
      ],
    },
    {
      path: "/ispo",
      element: <DashboardLayout />,
      children: [
        {
          path: "/ispo",
          element: <ISPO />,
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
