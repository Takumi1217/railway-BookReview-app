// Home.jsx

import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://railway.bookreview.techtrain.dev/public/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data.slice(0, 10)); // 先頭の10件を取得
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">書籍レビュー一覧</h1>
      <ul className="home__list">
        {books.map(book => (
          <li key={book.id} className="home__item">
            <div className="home__item-title">{book.title}</div>
            <div className="home__item-review">{book.review}</div>
            <div className="home__item-reviewer">レビュワー: {book.reviewer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
