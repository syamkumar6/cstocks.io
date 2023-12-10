import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './BookSlice'
import cartReduser from './cartSlice'
import userReduser from './UserSlice'

export default configureStore({
  reducer: {
    books: booksReducer,
    carts: cartReduser,
    auth: userReduser
  }
})