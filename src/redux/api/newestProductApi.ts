import { Product } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newestProductApi = createApi({
  reducerPath: "newestProductApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product/",
  }),
  endpoints: (builder) => ({
    getNewestProducts: builder.query<Product[], null>({
      query: () => "newest",
    }),
  }),
});

export const { useGetNewestProductsQuery } = newestProductApi;
