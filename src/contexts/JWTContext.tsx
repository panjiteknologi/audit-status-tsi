import { ReactNode, createContext, useEffect, useReducer } from 'react';

// third-party
// import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from '@contexts/auth-reducer/actions';
import authReducer, { initialState } from '@contexts/auth-reducer/auth';

// project import
import Loader from '@components/Loader';
import axios from '@utils/axios';

// const chance = new Chance();

const verifyToken = (serviceToken: string) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded;
};

const setSession = (serviceToken: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

type JWTContextType = {
  login: (mail: string, password: string) => Promise<any>;
  register: (country_id: string, email: string, group_category_id: string, mobile_number: string, password: string, password_confirmation: string) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  logout: () => void;
  isLoggedIn?: boolean;
  isInitialized?: boolean;
  user?: null | any;
}

const JWTContext = createContext({} as JWTContextType);
const payload = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
}

export const JWTProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const account = window.localStorage.getItem('user') as string;
          const user = JSON.parse(account);

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT,
            payload
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
          payload
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const data = {
      Auth: {
        email,
        password
      }
    };

    const response = await axios.post('/auth/login', data);
    const result = response.data.data;
    const user = Object.assign({}, result);

    delete user.access_token;

    localStorage.setItem('user', JSON.stringify(user));
    setSession(result?.access_token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (country_id: string, email: string, group_category_id: string, mobile_number: string, password: string, password_confirmation: string) => {
    // todo: this flow need to be recode as it not verified
    const response = await axios.post('/api/account/register', {
      country_id, email, group_category_id, mobile_number, password, password_confirmation
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users') as string;
      users = [
        ...JSON.parse(localUsers),
        {
          email,
          password,
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT, payload });
    window.localStorage.removeItem('user');
  };

  const resetPassword = async (email: string) => { };

  // const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, register, resetPassword, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
