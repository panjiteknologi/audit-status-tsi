import { useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import { APP_LOGGED_IN_PATH } from '@/config';
import useAuth from '@/hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location?.state?.from ? location?.state?.from : APP_LOGGED_IN_PATH, {
        state: {
          from: ''
        },
        replace: true
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

export default GuestGuard;
