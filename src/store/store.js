import { configureStore } from '@reduxjs/toolkit';
import scannerReducer from './scannerSlice'; 
import { productApi } from './productApiSlice';

export const store = configureStore({
  reducer: {
    scanner: scannerReducer,
    [productApi.reducerPath]: productApi.reducer,

  },
});