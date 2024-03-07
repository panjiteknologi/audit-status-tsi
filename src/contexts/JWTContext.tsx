/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { LOGIN, LOGOUT } from "@contexts/auth-reducer/actions";
import authReducer, { initialState } from "@contexts/auth-reducer/auth";
import Loader from "@components/Loader";
import axios from "@utils/axios";

export const BASE_URL = "http://101.50.2.90:5353/api/v1/cis/employee/";
export const API_LOGIN = "login_employee";
export const API_LOGOUT = "logout_employee";
export const GET_ID_EMPLOYEE = "get_employee_by_master_employee_id";
export const GET_MONTH = "get_month";
export const UPDATE_PAY_SLIP = "update_status_slip_gaji";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

type JWTContextType = {
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  isLoggedIn?: boolean;
  isInitialized?: boolean;
  user?: null | any;
};

const JWTContext = createContext({} as JWTContextType);
const payload = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

interface jwtProps {
  id: string;
  name: string;
}

const decodedToken = (serviceToken: string | null) => {
  if (!serviceToken) {
    return null;
  }

  const decoded: jwtProps = jwtDecode(serviceToken);

  localStorage.setItem("idEmployee", decoded?.id);
  localStorage.setItem("username", decoded?.name);

  return decoded;
};

const setSession = (serviceToken: string | null) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
    axios.defaults.headers.common.Authorization = serviceToken;
  } else {
    localStorage.removeItem("serviceToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export const JWTProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken) {
          const user = decodedToken(serviceToken);
          setSession(serviceToken);

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
            payload,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
          payload,
        });
      }
    };

    init();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post(BASE_URL + API_LOGIN, {
      username,
      password,
    });
    const { data } = response.data?.data;
    const user = decodedToken(data);
    setSession(data);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
      },
    });

    return data;
  };

  // const logout = async () => {
  //   const id = window.localStorage.getItem("idEmployee");
  //   const serviceToken = window.localStorage.getItem("serviceToken");

  //   const data = {
  //     master_employee_id: id,
  //   };

  //   const response = await axios.post(BASE_URL + API_LOGOUT, data, {
  //     headers: {
  //       Authorization: serviceToken,
  //     },
  //   });
  //   if (response) {
  //     setSession(null);
  //     dispatch({ type: LOGOUT, payload });
  //     window.localStorage.removeItem("idEmployee");
  //     window.localStorage.removeItem("serviceToken");
  //   }
  // };

  const logout = () => {
    setSession(null);
    dispatch({
      type: LOGOUT,
      payload: {
        isLoggedIn: undefined,
        user: undefined,
        isInitialized: undefined,
      },
    });
    window.localStorage.removeItem("idEmployee");
    window.localStorage.removeItem("serviceToken");
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
