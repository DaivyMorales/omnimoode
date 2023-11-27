import { Address } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getAddressById: builder.query<Address[], { id: number }>({
      query: ({ id }) => `address/${id}`,
    }),
  }),
});

export const { useGetAddressByIdQuery } = addressApi;
