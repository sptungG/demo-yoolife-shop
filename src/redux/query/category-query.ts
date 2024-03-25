import { createApi } from "@reduxjs/toolkit/query/react";

import { TCategoriesFilter, TCategory } from "@/types/category-type";
import { TResponse, TResultData } from "@/types/response-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Categories"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetAllCategories: builder.query<TResultData<TCategory[]>, TCategoriesFilter>({
      query: (filter) => ({
        url: "/business/api/services/app/Categories/GetList",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
    GetListCategoryFromChildren: builder.query<TResultData<TCategory[]>, { id: number }>({
      query: (filter) => ({
        url: "/business/api/services/app/Categories/GetListFromChildren",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
    GetCategoryById: builder.query<TResultData<TCategory>, { id: number }>({
      query: (filter) => ({
        url: "/business/api/services/app/Categories/GetById",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});
