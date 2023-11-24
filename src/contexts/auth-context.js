import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { useLoading } from './loading-context';
import { useMockUser } from '../hooks/use-mocked-user';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import * as sessionsApi from '../api/sessions';
import * as accountsApi from '../api/accounts';


const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isFinished: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isFinished: false,
            user
          })
          : ({
            isFinished: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const { loading, startLoading, stopLoading } = useLoading();

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    try {
      startLoading();
      const response = await sessionsApi.login(username, password);
      console.log(response);
      const token = response.token;
      const refreshToken = response.refreshToken;
      Cookies.set('token', token, { secure: true });
      Cookies.set('refreshToken', refreshToken, { secure: true });
      window.sessionStorage.setItem('authenticated', true);

      const user = await accountsApi.getAccountById(response.userId);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user
      });
    }
    finally {
      stopLoading();
    }
  };

  const signOut = () => {
    window.sessionStorage.removeItem('authenticated');
    window.localStorage.removeItem('user');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
