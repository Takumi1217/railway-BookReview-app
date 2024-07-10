// src/DetailBook.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailBook.css';

const DetailBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          setBook(data);
          setLoading(false);

          // 一覧画面から選択したときにログを送信する
          if (token) {
            await fetch('https://railway.bookreview.techtrain.dev/logs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ selectBookId: id }),
            });
          }

        } else {
          console.error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchBook();
  }, [id, token]);

  if (loading) {
    return <div className="loading">ローディング中...</div>;
  }

  if (!book) {
    return <div className="error">書籍の詳細情報を取得できませんでした。</div>;
  }

  return (
    <div className="detail-book">
      <div className="detail-book__header">
        <h1 className="detail-book__title">{book.title}</h1>
        {book.isMine && (
          <button className="detail-book__edit-button" onClick={() => navigate(`/edit/${id}`)}>編集</button>
        )}
      </div>
      <p className="detail-book__link">URL: {book.url}</p>
      <p className="detail-book__detail">詳細: {book.detail}</p>
      <p className="detail-book__review">レビュー: {book.review}</p>
      <p className="detail-book__reviewer">レビュワー: {book.reviewer}</p>
    </div>
  );
};

export default DetailBook;
