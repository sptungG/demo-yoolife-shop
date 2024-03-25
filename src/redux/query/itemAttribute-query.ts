import { createApi } from "@reduxjs/toolkit/query/react";

import { TItemAttribute, TItemAttributeFilter } from "@/types/itemAttribute-type";
import { TResponse, TResultData } from "@/types/response-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";

export const itemAttributeApi = createApi({
  reducerPath: "itemAttributeApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ItemAttributes"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetList: builder.query<TResultData<TItemAttribute[]>, TItemAttributeFilter>({
      query: (filter) => ({
        url: "/business/api/services/app/ItemAttributes/GetList",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "ItemAttributes", id: "LIST" }],
    }),
    // []
    GetById: builder.query<TResultData<TItemAttribute>, { id: number }>({
      query: (filter) => ({
        url: "/business/api/services/app/ItemAttributes/GetById",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "ItemAttributes", id: "LIST" }],
    }),
  }),
});
