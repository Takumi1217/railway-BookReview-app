// Signup.jsx

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Compressor from "compressorjs";
import axios from "axios";

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("必須項目です"),
      email: Yup.string()
        .email("無効なメールアドレスです")
        .required("必須項目です"),
      password: Yup.string()
        .min(6, "6文字以上で入力してください")
        .required("必須項目です"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "パスワードが一致しません")
        .required("必須項目です"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);

      axios
        .post(
          "https://app.swaggerhub.com/apis/INFO_3/BookReviewApplication/1.0.0/users",
          formData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        formik.setFieldValue("avatar", result);
      },
    });
  };

  return (
    <div>
      <h1>新規登録</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          ユーザー名:
          <input type="text" {...formik.getFieldProps("username")} />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </label>
        <label>
          メールアドレス:
          <input type="email" {...formik.getFieldProps("email")} />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </label>
        <label>
          パスワード:
          <input type="password" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </label>
        <label>
          パスワード確認:
          <input type="password" {...formik.getFieldProps("confirmPassword")} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </label>
        <label>
          アバター:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">登録</button>
      </form>
      <a href="/login">ログインはこちら</a>
    </div>
  );
};

export default Signup;
