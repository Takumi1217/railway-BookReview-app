// src/components/BookList.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = ({ books }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBookClick = async (id) => {
    try {
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

      navigate(`/detail/${id}`);
    } catch (error) {
      console.error('An error occurred while sending log:', error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id} className="book-list__item" onClick={() => handleBookClick(book.id)}>
          <div className="book-list__item-header">
            <div className="book-list__item-title">{book.title}</div>
            {book.isMine && (
              <button 
                className="book-list__edit-button"
                onClick={(e) => { e.stopPropagation(); handleEditClick(book.id); }}
              >
                編集
              </button>
            )}
          </div>
          <div className="book-list__item-review">{book.review}</div>
          <div className="book-list__item-reviewer">レビュワー: {book.reviewer}</div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
