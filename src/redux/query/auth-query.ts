import { createApi } from "@reduxjs/toolkit/query/react";

import { TResponse } from "@/types/response-type";

import { baseQuery } from "../app/baseQuery";

type TLoginData = {
  userNameOrEmailAddress: string;
  password: string;
  tenancyName?: string;
  rememberClient: boolean;
};
type TLoginRes = {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  thirdAccounts: string;
  userId: number;
  tenantId: number;
  emailAddress: string;
  isCitizen: true;
  mobileConfig: string;
  refreshToken: string;
  refreshTokenExpireInSeconds: number;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<TResponse<TLoginRes>, TLoginData>({
      query: (data) => ({
        url: "/api/TokenAuth/Authenticate",
        method: "post",
        body: data,
      }),
      invalidatesTags: [{ type: "auth", id: "login" }],
    }),

    logout: builder.mutation<any, any>({
      query: () => ({
        url: "/api/TokenAuth/LogOut",
        method: "get",
      }),
      invalidatesTags: [{ type: "auth", id: "LogOut" }],
    }),

    logoutFcm: builder.mutation<any, { token: string }>({
      query: (data) => ({
        url: "/api/services/app/FcmToken/LogoutFcmToken",
        method: "post",
        body: data,
      }),
      invalidatesTags: [{ type: "auth", id: "LogOut" }],
    }),
  }),
});
