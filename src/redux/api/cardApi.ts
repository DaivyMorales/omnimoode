import { Card } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getCardById: builder.query<Card[], { id: number }>({
      query: ({ id }) => `card/${id}`,
    }),
  }),
});

export const { useGetCardByIdQuery } = cardApi;
