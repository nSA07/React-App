import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiEndPoint = import.meta.env.VITE_PORT || 'http://localhost:3001'

export const boardsApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['Boards', 'Tasks', 'History', 'HistoryById'],
  baseQuery: fetchBaseQuery({ baseUrl: `${apiEndPoint}/api` }),
  endpoints: (build) => ({
    getBoards: build.query({
      query: (name) => `${name}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Boards' as const, id })),
              'Boards',
            ]
          : ['Boards'],
    }),
    getTasks: build.query({
      query: (name) => `${name}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              'Tasks',
            ]
          : ['Tasks'],
    }),
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
    getAllHistoryById: build.query({
      query: (name) => `${name}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'HistoryById' as const, id })),
              'HistoryById',
            ]
          : ['HistoryById'],
    }),
    addBoard: build.mutation({
      query: (body) => ({
        url: 'board',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: build.mutation({
      query: (id) => ({
        url: `board/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
    editBoard: build.mutation({
      query: (body) => ({
        url: `board/${body.id}`,
        method: 'PATCH',
        body: body.new_title,
      }),
      invalidatesTags: ['Boards'],
    }),
    addTasks: build.mutation({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards', 'Tasks', 'History', 'HistoryById'],
    }),
    deleteTasks: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards', 'Tasks', 'History', 'HistoryById'],
    }),
    editTasks: build.mutation({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: 'PATCH',
        body: body.new_task,
      }),
      invalidatesTags: ['Boards', 'Tasks', 'History', 'HistoryById'],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useDeleteBoardMutation,
  useEditBoardMutation,
  useAddTasksMutation,
  useGetTasksQuery,
  useDeleteTasksMutation,
  useEditTasksMutation,
  useGetHistoryQuery,
  useGetAllHistoryByIdQuery,
} = boardsApi;
