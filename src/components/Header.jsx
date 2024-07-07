// Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>書籍レビュー</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">ログイン</Link>
          </li>
          <li>
            <Link to="/signup">サインアップ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
