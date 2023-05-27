import React from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //state
  const [currentUser, setCurrentUser] = useState({});

  //refresh
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  //return
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
