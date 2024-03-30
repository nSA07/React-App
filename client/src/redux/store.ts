import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './boardApi';

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
  },
  middleware: (getDefauldMiddleware) =>
    getDefauldMiddleware().concat(boardsApi.middleware),
});
