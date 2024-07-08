// src/redux/booksSlice.js

import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    page: 0,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setBooks, setPage } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectPage = (state) => state.books.page;

export default booksSlice.reducer;
