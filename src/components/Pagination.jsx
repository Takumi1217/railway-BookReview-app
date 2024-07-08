// src/components/Pagination.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, selectPage } from '../redux/booksSlice';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  const handlePrev = () => {
    if (page > 0) {
      dispatch(setPage(page - 1));
    }
  };

  const handleNext = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={handlePrev}
        disabled={page === 0}
      >
        前へ
      </button>
      <button
        className="pagination__button"
        onClick={handleNext}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
