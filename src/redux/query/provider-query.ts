import { createApi } from "@reduxjs/toolkit/query/react";

import { TProvider } from "@/types/provider-type";
import { TResponse, TResultData } from "@/types/response-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";

export const providerApi = createApi({
  reducerPath: "providerApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Provider"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetProviderById: builder.query<TResultData<TProvider>, { id: number }>({
      query: (params) => ({ url: "/business/api/services/app/EcoFarmProviders/GetById", params }),
      providesTags: [{ type: "Provider", id: "LIST" }],
    }),
  }),
});
