import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useLoading } from "./loading-context";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import * as sessionsApi from "../api/sessions";
import * as accountsApi from "../api/accounts";
import { addMinutes, isAfter, parse } from "date-fns";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isFinished: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isFinished: false,
            user,
          }
        : {
            isFinished: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

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

    let isAuthenticated = Cookies.get("token") ? true : false;

    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
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

  const refreshToken = async () => {
    let token = Cookies.get("token");
    let refreshToken = Cookies.get("refreshToken");
    const storedTokenExpiryTime = Cookies.get("tokenExpiryTime");
    const storedRefreshTokenExpiryTime = Cookies.get("refreshTokenExpiryTime");

    try {
      let tokenExpiryTime = parse(storedTokenExpiryTime, "HH:mm dd/MM/yyyy", new Date());
      if (tokenExpiryTime != null && !isAfter(tokenExpiryTime, addMinutes(new Date(), 1))) {
        let refreshTokenExpiryTime = parse(
          storedRefreshTokenExpiryTime,
          "HH:mm dd/MM/yyyy",
          new Date()
        );
        console.log(storedRefreshTokenExpiryTime);
        console.log(refreshTokenExpiryTime);
        console.log(isAfter(refreshTokenExpiryTime, new Date()));
        if (refreshTokenExpiryTime != null && isAfter(refreshTokenExpiryTime, new Date())) {
          try {
            const response = await sessionsApi.refreshToken(token, refreshToken);
            if (response.succeeded) {
              token = response.data.token;
              refreshToken = response.data.refreshToken;

              const tokenExpiryTime = parse(
                response.data.tokenExpiryTime,
                "HH:mm dd/MM/yyyy",
                new Date()
              );
              const refreshTokenExpiryTime = parse(
                response.data.refreshTokenExpiryTime,
                "HH:mm dd/MM/yyyy",
                new Date()
              );

              Cookies.set("token", token, { secure: true, expires: tokenExpiryTime });
              Cookies.set("tokenExpiryTime", response.data.tokenExpiryTime, {
                secure: true,
                expires: tokenExpiryTime,
              });
              Cookies.set("refreshToken", refreshToken, {
                secure: true,
                expires: refreshTokenExpiryTime,
              });
              Cookies.set("refreshTokenExpiryTime", response.data.refreshTokenExpiryTime, {
                secure: true,
                expires: refreshTokenExpiryTime,
              });

              return {
                isSuccessfully: true,
                data: token,
              };
            } else {
              return {
                isSuccessfully: false,
                data: `Refresh token thất bại: ${response.messages}`,
              };
            }
          } catch (error) {
            console.error("Lỗi khi refresh token:", error);
            return {
              isSuccessfully: false,
              data: `Lỗi khi refresh token: ${error}`,
            };
          }
        } else {
          console.log("Refresh token hết hạn");
          removeItems();
          return {
            isSuccessfully: false,
            data: "Refresh token hết hạn! Vui lòng đăng nhập lại!",
          };
        }
      }
      return { isSuccessfully: true, data: token };
    } catch (error) {
      console.error("Lỗi khi refresh token:", error);
      return {
        isSuccessfully: false,
        data: `Lỗi khi refresh token: ${error}`,
      };
    }
  };

  const signIn = async (username, password) => {
    try {
      startLoading();
      const response = await sessionsApi.login(username, password);
      console.log(response);
      const token = response.token;
      const refreshToken = response.refreshToken;
      const tokenExpiryTime = parse(response.tokenExpiryTime, "HH:mm dd/MM/yyyy", new Date());
      const refreshTokenExpiryTime = parse(
        response.refreshTokenExpiryTime,
        "HH:mm dd/MM/yyyy",
        new Date()
      );

      Cookies.set("token", token, { secure: true, expires: tokenExpiryTime });
      Cookies.set("tokenExpiryTime", response.tokenExpiryTime, {
        secure: true,
        expires: tokenExpiryTime,
      });
      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        expires: refreshTokenExpiryTime,
      });
      Cookies.set("refreshTokenExpiryTime", response.refreshTokenExpiryTime, {
        secure: true,
        expires: refreshTokenExpiryTime,
      });
      window.sessionStorage.setItem("authenticated", true);
      window.sessionStorage.setItem("userId", response.userId);

      const user = await accountsApi.getAccountById(response.userId, null, token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: user,
      });
    } finally {
      stopLoading();
    }
  };

  const removeItems = () => {
    window.sessionStorage.removeItem("authenticated");
    window.localStorage.removeItem("user");
    window.sessionStorage.removeItem("userId");
    Cookies.remove("token");
    Cookies.remove("tokenExpiryTime");
    Cookies.remove("refreshToken");
    Cookies.remove("refreshTokenExpiryTime");
  };

  // useEffect(() => {
  //   let isPageRefresh = false;

  //   const handleBeforeUnload = (event) => {
  //     if (!isPageRefresh) {
  //       // Page is being refreshed or navigated away, do not remove items
  //       console.log("Page is being refreshed or navigated away, do not remove items");
  //     } else {
  //       // Page is being closed, handle your logic
  //       console.log("Page is being closed, remove items if needed");
  //       // removeItems();
  //     }
  //   };

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       // Page is being refreshed
  //       isPageRefresh = true;
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const signOut = () => {
    removeItems();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loading,
        signIn,
        signOut,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
