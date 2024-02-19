import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project import
import Loader from '@/components/Loader';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

// ==============================|| LAYOUT - SIMPLE / LANDING ||============================== //

const SimpleLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
      <FooterBlock />
    </Suspense>
  );
};

export default SimpleLayout;
