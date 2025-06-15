import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urls from './serverUrls';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.base,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    addChannel: builder.mutation({
      query: (body) => ({
        url: 'channels',
        method: 'POST',
        body,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, channelName }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name: channelName },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query({
      query: () => 'messages',
    }),
    addMessage: builder.mutation({
      query: (body) => ({
        url: 'messages',
        method: 'POST',
        body,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, newName }) => ({
        url: `messages/${id}`,
        method: 'PATCH',
        body: { name: newName },
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddChannelMutation,
  useAddMessageMutation,
  useEditChannelMutation,
  useEditMessageMutation,
  useRemoveChannelMutation,
  useRemoveMessageMutation,
} = chatApi;
