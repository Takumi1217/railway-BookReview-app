// Login.jsx

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("無効なメールアドレスです")
        .required("必須項目です"),
      password: Yup.string().required("必須項目です"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          "https://app.swaggerhub.com/apis/INFO_3/BookReviewApplication/1.0.0/signin",
          values
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">ログイン</button>
      </form>
      <a href="/signup">新規登録はこちら</a>
    </div>
  );
};

export default Login;
