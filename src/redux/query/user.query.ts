import { createApi } from "@reduxjs/toolkit/query/react";
import { TResponse } from "src/types/response.types";
import { TUser } from "src/types/user.types";
import baseQuery from "../app/baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["Users"],
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<TResponse<TUser>, { at: boolean }>({
      query: () => ({ url: "/api/services/app/UserDefault/GetDetail", method: "get" }),
      providesTags: (result) =>
        result?.result
          ? [
              { type: "Users", id: result?.result.id },
              { type: "Users", id: "ME" },
            ]
          : [{ type: "Users", id: "LIST" }],
      extraOptions: {},
    }),
  }),
});
export const { useGetCurrentUserQuery } = userApi;
