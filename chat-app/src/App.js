import React from 'react';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const { isRegistrationCompleted } = useSelector((state) => state.search);

  const ProtectedRouteNoUser = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  const ProtectedRouteUser = ({ children }) => {
    if (currentUser && isRegistrationCompleted) {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <ProtectedRouteNoUser>
              <Home />
            </ProtectedRouteNoUser>
          }
        />
        <Route
          path="Register"
          element={
            <ProtectedRouteUser>
              <Register />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="Login"
          element={
            <ProtectedRouteUser>
              <Login />
            </ProtectedRouteUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
