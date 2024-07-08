// src/Signup.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Compressor from 'compressorjs';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';

const Signup = () => {
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/users', values);
      const token = response.data.token;
      localStorage.setItem('token', token);

      if (icon) {
        new Compressor(icon, {
          quality: 0.6,
          maxWidth: 800,
          success(result) {
            const formData = new FormData();
            formData.append('icon', result);

            axios.post('https://railway.bookreview.techtrain.dev/uploads', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            });
          },
          error(err) {
            setError('Icon upload failed');
          },
        });
      }

      // ユーザー情報を取得して保存する
      const userResponse = await axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userName = userResponse.data.name;
      localStorage.setItem('userName', userName);

      navigate('/');
    } catch (err) {
      setError('Signup failed');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <div className="signup">
      <h2 className="signup__title">サインアップ</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ setFieldValue }) => (
          <Form className="signup__form">
            <Field type="text" name="name" placeholder="Name" className="signup__input" />
            <ErrorMessage name="name" component="div" className="signup__error" />
            <Field type="email" name="email" placeholder="Email" className="signup__input" />
            <ErrorMessage name="email" component="div" className="signup__error" />
            <Field type="password" name="password" placeholder="Password" className="signup__input" />
            <ErrorMessage name="password" component="div" className="signup__error" />
            <input type="file" accept="image/*" onChange={(e) => setIcon(e.target.files[0])} className="signup__file" />
            {error && <p className="signup__error">{error}</p>}
            <button type="submit" className="signup__button">サインアップ</button>
          </Form>
        )}
      </Formik>
      <a href="/login" className="signup__link">Login</a>
    </div>
  );
};

export default Signup;
