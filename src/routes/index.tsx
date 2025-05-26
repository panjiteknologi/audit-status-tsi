/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loadable from "@/components/Loadable";
import AuthLayout from "@/layout/Auth";
import DashboardLayout from "@/layout/Dashboard";
// import ScopeLibrary from "@/pages/scope-library";
// import DetailProject from "@/pages/detail-project";

const TokenHandler = Loadable(lazy(() => import("@/routes/TokenHandler")));
const Dashboard = Loadable(lazy(() => import("@/pages/dashboard")));
// const ISO = Loadable(lazy(() => import("@/pages/iso")));
// const ISPO = Loadable(lazy(() => import("@/pages/ispo")));

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
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    // {
    //   path: "/iso",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/iso",
    //       element: <ISO />,
    //     },
    //   ],
    // },
    // {
    //   path: "/iso-progress",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/iso-progress",
    //       element: <ISO />,
    //     },
    //   ],
    // },
    // {
    //   path: "/iso-done",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/iso-done",
    //       element: <ISO />,
    //     },
    //   ],
    // },
    // {
    //   path: "/ispo",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/ispo",
    //       element: <ISPO />,
    //     },
    //   ],
    // },
    // {
    //   path: "/scope-library",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/scope-library",
    //       element: <ScopeLibrary />,
    //     },
    //   ],
    // },
    // {
    //   path: "/detail-project/:id",
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       path: "/detail-project/:id",
    //       element: <DetailProject />,
    //     },
    //   ],
    // },
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
