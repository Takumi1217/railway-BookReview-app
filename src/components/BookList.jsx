// src/components/BookList.jsx

import React from 'react';
import './BookList.css';

const BookList = ({ books }) => (
  <ul className="book-list">
    {books.map(book => (
      <li key={book.id} className="book-list__item">
        <div className="book-list__item-title">{book.title}</div>
        <div className="book-list__item-review">{book.review}</div>
        <div className="book-list__item-reviewer">レビュワー: {book.reviewer}</div>
      </li>
    ))}
  </ul>
);

export default BookList;
