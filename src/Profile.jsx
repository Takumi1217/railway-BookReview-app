// src/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Profile.css';

const Profile = () => {
  const [initialValues, setInitialValues] = useState({ name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://railway.bookreview.techtrain.dev/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInitialValues({ name: response.data.name });
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = async (values) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put('https://railway.bookreview.techtrain.dev/users', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('userName', response.data.name);
      navigate('/');
    } catch (err) {
      setError('Profile update failed');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  return (
    <div className="profile">
      <h2 className="profile__title">ユーザー情報編集</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleProfileUpdate}
      >
        <Form className="profile__form">
          <Field type="text" name="name" placeholder="Name" className="profile__input" />
          <ErrorMessage name="name" component="div" className="profile__error" />
          {error && <p className="profile__error">{error}</p>}
          <button type="submit" className="profile__button">更新</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Profile;
