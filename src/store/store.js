import { configureStore } from '@reduxjs/toolkit';
import scannerReducer from './scannerSlice'; 

export const store = configureStore({
  reducer: {
    scanner: scannerReducer,
  },
});