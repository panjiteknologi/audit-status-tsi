import { ReactNode, createContext, useEffect, useReducer } from "react";
import { LOGIN, LOGOUT } from "@contexts/auth-reducer/actions";
import authReducer, { initialState } from "@contexts/auth-reducer/auth";
import Loader from "@components/Loader";
import axios from "@utils/axios";

export const BASE_URL = "https://erp.tsicertification.com/";
export const BASE_API = "api/";
export const API_LOGIN = "session/authenticate";
export const API_LOGOUT = "session/logout";
export const GET_ALL_PROJECT = "get_date_customer";
export const GET_ALL_STANDARD = "chart_list_standards";
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
export const UPDATE_READ_NOTIFICATION = "update_read_notifikasi";
export const GET_PROJECT_BY_ID_PROJECT = "get_project_by_id_project";
export const VALIDATE_TOKEN = "api/validate_token";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

type JWTContextType = {
  postLogin: (login: string, password: string, db: string) => Promise<any>;
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
        const userData = window.localStorage.getItem("userData");

        if (serviceToken) {
          const user = userData;
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

  const postLogin = async (login: string, password: string, db: string) => {
    const response = await axios.post(BASE_URL + API_LOGIN, {
      params: {
        db,
        login,
        password,
      },
    });

    const data = response?.data?.result;
    const { access_token } = response?.data?.result;

    setSession(access_token);
    if (access_token) {
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            user_id: data?.user_id,
            user_name: data?.user_name,
          },
        },
      });
    }

    return data;
  };

  const logout = async () => {
    const serviceToken = window.localStorage.getItem("serviceToken");

    try {
      await axios.post(BASE_URL + API_LOGOUT, {
        params: {
          access_token: serviceToken,
        },
      });
    } catch (error) {
      console.error("Logout API error:", error);
    }

    // Bersihkan session dan local storage
    setSession(null);

    // Reset state menggunakan initialState
    dispatch({
      type: LOGOUT,
      payload: {
        ...initialState,
        isLoggedIn: undefined,
        user: undefined,
        isInitialized: true, // Bisa ditandai true agar tidak stuck di <Loader />
      },
    });

    window.localStorage.removeItem("idUser");
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem("serviceToken");
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, postLogin, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
