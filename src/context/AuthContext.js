import React, { createContext, useState } from "react";
import AuthService from "services/AuthService";

const AuthContext = createContext({
  user: null,
  signIn: null,
  signOut: null,
});

const AuthProvider = ({ children }) => {
  const token = AuthService.getToken();
  let initialState = null;

  if (token) initialState = {};

  const [user, setUser] = useState(initialState);

  const signIn = async ({ username, password }) => {
    try {
      const user = await AuthService.signIn(username, password);
      setUser(user);

      return user;
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const signOut = () => {
    setUser(null);
    AuthService.signOut();
  };

  const isAuth = () => {
    return Boolean(AuthService.getToken());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
