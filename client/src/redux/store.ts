import { configureStore } from '@reduxjs/toolkit';
import { boardsApi } from './boardApi';
import { historyApi } from './historyApi';

export const store = configureStore({
  reducer: {
    [boardsApi.reducerPath]: boardsApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (getDefauldMiddleware) =>
    getDefauldMiddleware().concat(boardsApi.middleware, historyApi.middleware),
});
