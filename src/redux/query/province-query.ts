import { createApi } from "@reduxjs/toolkit/query/react";

import { TResponse } from "@/types/response-type";

import { baseQuery } from "../app/baseQuery";

export type TProvince = {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeRegionId: number;
  administrativeUnitId: number;
};
export type TDistrict = {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  provinceCode: string;
  administrativeUnitId: number;
};
export type TWard = {
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  districtCode: string;
  administrativeUnitId: number;
};

export const vauApi = createApi({
  reducerPath: "vauApi",
  baseQuery: baseQuery,
  tagTypes: ["Provinces", "Districts", "Wards"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetAllProvinces: builder.query<TResponse<TProvince[]>, any>({
      query: () => `/api/services/app/VietnameseAdministrative/GetAllProvinces`,
      providesTags: ["Provinces"],
    }),
    GetAllDistricts: builder.query<TResponse<TDistrict[]>, { code: string }>({
      query: ({ code }) =>
        `/api/services/app/VietnameseAdministrative/GetAllDistricts?provinceCode=${code}`,
      providesTags: ["Districts"],
    }),
    GetAllWards: builder.query<TResponse<TWard[]>, { code: string }>({
      query: ({ code }) =>
        `/api/services/app/VietnameseAdministrative/GetAllWards?districtCode=${code}`,
      providesTags: ["Wards"],
    }),
    mutateGetProvinces: builder.mutation<TResponse<TProvince[]>, any>({
      query: () => ({
        url: `/api/services/app/VietnameseAdministrative/GetAllProvinces`,
        method: "GET",
      }),
      invalidatesTags: ["Provinces"],
    }),
    mutateGetDistricts: builder.mutation<TResponse<TDistrict[]>, { code: string }>({
      query: ({ code }) => ({
        url: `/api/services/app/VietnameseAdministrative/GetAllDistricts?provinceCode=${code}`,
        method: "GET",
      }),
      invalidatesTags: ["Districts"],
    }),
    mutateGetWards: builder.mutation<TResponse<TWard[]>, { code: string }>({
      query: ({ code }) => ({
        url: `/api/services/app/VietnameseAdministrative/GetAllWards?districtCode=${code}`,
        method: "GET",
      }),
      invalidatesTags: ["Wards"],
    }),
  }),
});
export const {
  useGetAllProvincesQuery,
  useGetAllDistrictsQuery,
  useGetAllWardsQuery,
  useMutateGetDistrictsMutation,
  useMutateGetProvincesMutation,
  useMutateGetWardsMutation,
} = vauApi;
