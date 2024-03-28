import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const boardsApi = createApi({
  reducerPath: 'boardApi',
  tagTypes: ['Boards', 'Tasks'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
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
    addTasks: build.mutation({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards', 'Tasks'],
    }),
    deleteTasks: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards', 'Tasks'],
    }),
    editTasks: build.mutation({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: 'PATCH',
        body: body.new_task,
      }),
      invalidatesTags: ['Boards','Tasks'],
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
  useEditTasksMutation
} = boardsApi;
