import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// https://nominatim.org/release-docs/develop/api/Reverse/
const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: "https://nominatim.openstreetmap.org",
    headers: { "Accept-Language": "vi-VI" },
  }),
  { maxRetries: 0 },
);

type TReverseGeocodingRes = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  place_rank: string;
  category: string;
  type: string;
  importance: string;
  addresstype: string;
  display_name: string;
  name: string;
  address: any;
  boundingbox: string[];
};

const mapString = (text?: string) => (!!text ? `,${text}` : "");

export const nominatimApi = createApi({
  reducerPath: "nominatimApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["ReverseGeocoding"],
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    getReverseGeocoding: builder.query<
      { display_name: string },
      { latitude: number; longitude: number }
    >({
      query: ({ latitude, longitude }) => ({
        url: "/reverse",
        params: { lat: latitude, lon: longitude, format: "jsonv2" },
      }),
      transformResponse: (baseQueryReturnValue: TReverseGeocodingRes, meta, arg) => {
        const address = baseQueryReturnValue.address;
        return {
          display_name: `${mapString(address.road)}${mapString(address.village)}${mapString(
            address.suburb,
          )}${mapString(address.neighbourhood)}${mapString(address.city_district)}${mapString(
            address.state,
          )}${mapString(address.city)}`.replace(/\,/, ""),
        };
      },
      providesTags: ["ReverseGeocoding"],
    }),
    reverseGeocoding: builder.mutation<
      { display_name: string },
      { latitude: number; longitude: number }
    >({
      query: ({ latitude, longitude }) => ({
        url: "/reverse",
        method: "get",
        params: { lat: latitude, lon: longitude, format: "jsonv2", zoom: 17 },
      }),
      transformResponse: (baseQueryReturnValue: TReverseGeocodingRes, meta, arg) => {
        const address = baseQueryReturnValue.address;
        return {
          display_name: `${mapString(address.road)}${mapString(address.village)}${mapString(
            address.suburb,
          )}${mapString(address.neighbourhood)}${mapString(address.city_district)}${mapString(
            address.state,
          )}${mapString(address.city)}`.replace(/\,/, ""),
        };
      },
      invalidatesTags: ["ReverseGeocoding"],
    }),
  }),
});
