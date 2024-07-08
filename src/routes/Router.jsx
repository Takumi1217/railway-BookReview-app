// src/routes/Router.jsx

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Signup from "../Signup";
import Login from "../Login";
import Profile from "../Profile";
import Home from "../Home";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
