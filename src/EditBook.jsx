// src/EditBook.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setUrl(data.url);
          setDetail(data.detail);
          setReview(data.review);
        } else {
          console.error('Failed to fetch book details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchBookDetails();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, url, detail, review })
      });

      if (response.ok) {
        alert('書籍レビューが更新されました！');
        navigate('/');
      } else {
        alert('書籍レビューの更新に失敗しました。');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('書籍レビューの更新に失敗しました。');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('書籍レビューが削除されました！');
        navigate('/');
      } else {
        alert('書籍レビューの削除に失敗しました。');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('書籍レビューの削除に失敗しました。');
    }
  };

  return (
    <div className="edit-book">
      <h1>書籍レビューの編集</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">更新</button>
        <button type="button" onClick={handleDelete}>削除</button>
      </form>
    </div>
  );
};

export default EditBook;
