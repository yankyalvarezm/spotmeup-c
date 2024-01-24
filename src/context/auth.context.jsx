import React, { createContext, useState, useEffect } from "react";
import { storeToken, authenticateUser } from "../services/auth.service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticateUser()
      .then((response) => {
        setIsLoggedIn(response.isLoggedIn);
        setIsLoading(response.isLoading);
        setUser(response.user);
      })
      .catch((error) => {
        console.log("Context Error - Line 19:", error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        setUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
