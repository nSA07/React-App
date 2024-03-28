import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  tagTypes: ['History'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (build) => ({
    getHistory: build.query({
      query: (name) => `${name}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'History' as const, id })),
              'History',
            ]
          : ['History'],
    }),
  }),
});

export const {
    useGetHistoryQuery
} = historyApi;
