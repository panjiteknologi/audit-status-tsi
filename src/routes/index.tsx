import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import Loadable from '@/components/Loadable';
import AuthLayout from '@/layout/Auth';
import DashboardLayout from '@/layout/Dashboard';

// render - page
const AuthLogin = Loadable(lazy(() => import('@/pages')));
const PaySlip = Loadable(lazy(() => import('@/pages/payslip')));

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
          path: 'payslip',
          element: <PaySlip />
        },
      ]
    }
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
