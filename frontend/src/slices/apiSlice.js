import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urls from './serverUrls';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.base,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
  }),
});

export const { useGetChannelsQuery } = chatApi;