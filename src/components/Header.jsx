// src/components/Header.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')}>書籍レビュー</h1>
      <nav>
        <ul>
          {token ? (
            <>
              <li>{userName}</li>
              <li><Link to="/profile">ユーザー情報編集</Link></li>
              <li><button onClick={handleLogout} className="logout-button">ログアウト</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">ログイン</Link></li>
              <li><Link to="/signup">サインアップ</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
