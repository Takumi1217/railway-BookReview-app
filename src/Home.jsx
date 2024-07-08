// src/Home.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks, setPage, selectBooks, selectPage } from './redux/booksSlice';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectPage);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://railway.bookreview.techtrain.dev/public/books?offset=${page * 10}`);
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
  }, [dispatch, page]);

  return (
    <div className="home">
      <h1 className="home__title">書籍レビュー一覧</h1>
      <BookList books={books} />
      <div className="home__pagination">
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
