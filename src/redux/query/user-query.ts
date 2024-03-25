import { createApi } from "@reduxjs/toolkit/query/react";

import { TBaseFilter } from "@/types/global-type";
import { TResponse, TResultData } from "@/types/response-type";
import {
  TCreateUserAddressData,
  TListUserAddressFilter,
  TProvider,
  TUser,
  TUserAddress,
} from "@/types/user-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "UserAddresses", "Providers", "ProviderAddresses"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<TResponse<TUser>, { at: boolean }>({
      query: () => "/api/services/app/UserDefault/GetDetail",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),

    GetListAddress: builder.query<TResultData<TUserAddress[]>, TListUserAddressFilter>({
      query: () => "/business/api/services/app/UserAddresses/GetList",
      providesTags: [{ type: "UserAddresses", id: "LIST" }],
    }),
    createAddress: builder.mutation<TResultData<any>, TCreateUserAddressData>({
      query: (data) => ({
        url: "/business/api/services/app/UserAddresses/Create",
        method: "post",
        body: data,
      }),
      invalidatesTags: [
        { type: "Users", id: "LIST" },
        { type: "UserAddresses", id: "LIST" },
      ],
    }),

    GetByIdProvider: builder.query<TResultData<TProvider>, { id: number }>({
      query: (data) => ({ url: "/business/api/services/app/Providers/GetById", params: data }),
      providesTags: [{ type: "Providers", id: "LIST" }],
    }),

    GetListAddressProvider: builder.query<TResultData<TUserAddress[]>, TListUserAddressFilter>({
      query: () => "/business/api/services/app/ProviderAddresses/GetList",
      providesTags: [
        { type: "Providers", id: "LIST" },
        { type: "ProviderAddresses", id: "LIST" },
      ],
    }),
  }),
});
