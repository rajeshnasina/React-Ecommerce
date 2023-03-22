import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './reducers/Wishlist'
export const store = configureStore({
  reducer: {
    wishlist:wishlistReducer
  },
})