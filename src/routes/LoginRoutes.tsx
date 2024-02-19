import { lazy } from 'react';

// project import
import AuthLayout from '@/layout/Auth';
import Loadable from '@/components/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('@/pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('@/pages/auth/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
      ]
    }
  ]
};

export default LoginRoutes;
