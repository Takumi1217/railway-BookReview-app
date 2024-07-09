// src/NewBook.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewBook.css';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://railway.bookreview.techtrain.dev/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, url, detail, review })
      });

      if (response.ok) {
        alert('書籍レビューが登録されました！');
        navigate('/');
      } else {
        alert('書籍レビューの登録に失敗しました。');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('書籍レビューの登録に失敗しました。');
    }
  };

  return (
    <div className="new-book">
      <h1>書籍レビューの登録</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">詳細</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">レビュー</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default NewBook;
