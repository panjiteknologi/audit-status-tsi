import { useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// project import
import { APP_LOGGED_IN_PATH } from "@/config";
import useAuth from "@/hooks/useAuth";

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      let role = user?.role;
      let path = APP_LOGGED_IN_PATH;
      /** ======== | ROLE
        1 : super_admin
        2 : customer
        3 : operator_iso
        4 : operator_ispo
        5 : operator_ict
        6 : crm
        7 : finance
        8 : sales
        9 : product_development
        10 : auditor
        11 : director
        12 :  monitor
        ======== | ROLE **/

      if (role === "3") {
        path = "/iso";
      }

      if (role === "4") {
        path = "/ispo";
      }

      navigate(location?.state?.from ? location?.state?.from : path, {
        state: {
          from: "",
        },
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

export default GuestGuard;
