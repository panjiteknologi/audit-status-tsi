// action - state management
import { LOGIN, LOGOUT } from './actions';

type StateType = {
  isLoggedIn?: boolean;
  user?: null | any;
  isInitialized?: boolean;
}

// initial state
export const initialState: StateType = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH REDUCER ||============================== //

type Action = {
  type: '@auth/LOGIN' | '@auth/LOGOUT';
  payload: {
    isLoggedIn?: boolean;
    user?: null | any;
    isInitialized?: boolean;
  }
}

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default auth;
