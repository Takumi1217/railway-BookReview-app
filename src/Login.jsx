// src/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/signin', values);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError('Login failed');
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className="login">
      <h2 className="login__title">ログイン</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="login__form">
          <Field type="email" name="email" placeholder="Email" className="login__input" />
          <ErrorMessage name="email" component="div" className="login__error" />
          <Field type="password" name="password" placeholder="Password" className="login__input" />
          <ErrorMessage name="password" component="div" className="login__error" />
          {error && <p className="login__error">{error}</p>}
          <button type="submit" className="login__button">ログイン</button>
        </Form>
      </Formik>
      <a href="/signup" className="login__link">Signup</a>
    </div>
  );
};

export default Login;
