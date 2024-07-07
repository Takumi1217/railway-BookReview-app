// App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
