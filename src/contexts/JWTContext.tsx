import { ReactNode, createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { LOGIN, LOGOUT } from "@contexts/auth-reducer/actions";
import authReducer, { initialState } from "@contexts/auth-reducer/auth";
import Loader from "@components/Loader";
import axios from "@utils/axios";

export const BASE_URL = "http://101.50.2.90:5454/api/v1/audit_status/";
export const API_LOGIN = "login_user";
export const API_LOGOUT = "logout_user";
export const GET_ALL_PROJECT = "get_all_project";
export const GET_ALL_ISO = "get_all_project_iso";
export const GET_ALL_ISPO = "get_all_project_ispo";
export const GET_AKREDITASI = "get_akreditasi";
export const GET_STANDARD = "get_standar";
export const GET_STATUS_PEMBAYARAN = "get_status_pembayaran";
export const GET_TAHAPAN = "get_tahapan";
export const ADD_PROJECT = "add_project";
export const ADD_ISPO = "add_project_ispo";
export const UPDATE_PROJECT = "update_project";
export const UPDATE_ISPO = "update_project_ispo";
export const GET_NOTIFICATION = "get_notifikasi";
export const UPDATE_READ_NOTIFICATION = "update_read_notifikasi";
export const GET_PROJECT_BY_ID_PROJECT = "get_project_by_id_project";

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

  localStorage.setItem("idUser", decoded?.id);
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
    window.localStorage.removeItem("idUser");
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
