import { Cart } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    // getProducts: builder.query<Cart[], null>({
    //   query: () => 'cart/cartProduct',
    // }),
    getCartById: builder.query<Cart, { id: number }>({
      query: ({ id }) => `cart/cartProduct/${id}`,
    }),
  }),
});

export const { useGetCartByIdQuery } = cartApi;
