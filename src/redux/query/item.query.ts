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
  endpoints: (build) => ({
    getItems: build.query<TCategoriesResponse<Data<Items>>, void>({
      query: (data) => ({
        url: "/api/services/app/AdminCategory/GetAllCategories",
        method: "get",
        body: data,
      }),
      providesTags: [{ type: "Get", id: "GetAllCategories" }],
    }),
    getItemsByUser: build.query<TItemsResponse<DataItems<ItemsDetail>>, any>({
      query: (data) => ({
        url: "/api/services/app/Item/GetAllItemsByUser",
        method: "get",
        params: { ...data },
      }),
      providesTags: [{ type: "Get", id: "GetItemsByUser" }],
    }),
    getAllItems: build.query<TAllItemsResponse, void>({
      query: (data) => ({
        url: "/api/services/app/Item/GetAllItemsMainPage",
        method: "get",
        body: data,
      }),
      providesTags: [{ type: "Get", id: "GetAllItems" }],
    }),
    getProvince: build.query<String, void>({
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
