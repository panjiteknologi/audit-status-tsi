import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';

import SimpleLayout from '@/layout/Simple';
import Loadable from '@/components/Loadable';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('@/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        {
          index: true,
          element: <PagesLanding />
        }
      ]
    },
    LoginRoutes,
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
