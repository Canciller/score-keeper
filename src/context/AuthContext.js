import React, { createContext, useState } from 'react';
import AuthService from 'services/AuthService';

const AuthContext = createContext({
  user: null,
  signIn: null,
  signOut: null
});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signIn = async ({
    username,
    password
  }) => {
    try {
      const user = await AuthService.signIn(username, password);
      setUser(user);

      return user;
    } catch(err) {
      // TODO: Handle signIn error.
      setUser(null);
      throw err;
    }
  }

  const signOut = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}