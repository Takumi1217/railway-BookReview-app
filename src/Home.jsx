// src/Home.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBooks, setPage, selectBooks, selectPage } from './redux/booksSlice';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = token 
          ? `https://railway.bookreview.techtrain.dev/books?offset=${page * 10}` 
          : `https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`;
        const response = await fetch(url, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setBooks(data));
        } else {
          console.error('Failed to fetch books');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchBooks();
  }, [dispatch, page, token]);

  const handleNewBookClick = () => {
    navigate('/new');
  };

  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__title">書籍レビュー一覧</h1>
        <button className="home__new-book-button" onClick={handleNewBookClick}>
          新規登録
        </button>
      </div>
      <BookList books={books} />
      <div className="home__pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
