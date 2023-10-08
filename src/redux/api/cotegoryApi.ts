import { Category } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], null>({
            query: () => "category",
        }),
        getCategoryById: builder.query<Category, { id: number }>({
            query: ({ id }) => `category/${id}`
        })
    })
})

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;