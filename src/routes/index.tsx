import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import Loadable from '@/components/Loadable';
import AuthLayout from '@/layout/Auth';
import DashboardLayout from '@/layout/Dashboard';

// render - page
const AuthLogin = Loadable(lazy(() => import('@/pages')));
const Dashboard = Loadable(lazy(() => import('@/pages/dashboard')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />
        },
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
      ]
    }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
