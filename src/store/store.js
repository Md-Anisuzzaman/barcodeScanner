import { configureStore } from '@reduxjs/toolkit';
import scannerReducer from './scannerSlice'; 
import { productApi } from './productApiSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    scanner: scannerReducer,
    cart: cartReducer, // ✅ FIXED (move here)
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});