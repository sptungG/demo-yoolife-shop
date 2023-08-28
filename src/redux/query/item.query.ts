import { createApi } from "@reduxjs/toolkit/query/react";
import {
  Data,
  DataItems,
  Items,
  ItemsDetail,
  TAllItemsResponse,
  TCategoriesResponse,
  TItemsResponse,
} from "src/types/item.types";
import baseQuery from "../app/baseQuery";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: baseQuery,
  tagTypes: ["Get"],
  endpoints: (builder) => ({
    getItems: builder.query<TCategoriesResponse<Data<Items>>, void>({
      query: (data) => ({
        url: "/api/services/app/AdminCategory/GetAllCategories",
        method: "get",
        body: data,
      }),
      providesTags: [{ type: "Get", id: "GetAllCategories" }],
    }),
    getItemsByUser: builder.query<TItemsResponse<DataItems<ItemsDetail>>, any>({
      query: (data) => ({
        url: "/api/services/app/Item/GetAllItemsByUser",
        method: "get",
        params: { ...data },
      }),
      providesTags: [{ type: "Get", id: "GetItemsByUser" }],
    }),
    getAllItems: builder.query<TAllItemsResponse, void>({
      query: (data) => ({
        url: "/api/services/app/Item/GetAllItemsMainPage",
        method: "get",
        body: data,
      }),
      providesTags: [{ type: "Get", id: "GetAllItems" }],
    }),
    getProvince: builder.query<String, void>({
      query: (data) => ({
        url: "/api/services/app/VietnameseAdministrative/GetAllProvinces",
        method: "get",
        body: data,
      }),
      providesTags: [{ type: "Get", id: "GetProvines" }],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemsByUserQuery,
  useGetAllItemsQuery,
  useGetProvinceQuery,
} = itemApi;
