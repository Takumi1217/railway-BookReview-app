// Router.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../Home";
import Signup from "../Signup";
import Login from "../Login";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
