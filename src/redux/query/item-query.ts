import { createApi } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";
import { equals, groupBy, mergeAll, mergeRight, mergeWith, uniqBy, uniqWith } from "rambda";

import { TBaseFilter } from "@/types/global-type";
import {
  TAddToCartData,
  TCalculateTotalPriceData,
  TCalculateTotalPriceRes,
  TCart,
  TCreateOrderData,
  TDeliveryEstimateData,
  TItem,
  TItemFlashSale,
  TItems1Filter,
  TItems2Filter,
  TItemsFavoriteFilter,
  TItemsRandomFilter,
  TListRateFilter,
  TListVoucherFilter,
  TRateItem,
  TUpdateCartData,
  TVoucher,
} from "@/types/item-type";
import { TResponse, TResultData } from "@/types/response-type";
import { TUser } from "@/types/user-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";
import { TImageConfig } from "./../../types/item-type";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Item", "Cart", "Banner", "Delivery", "Rate", "Voucher", "Order", "FlashSale"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetListItemsByUser: builder.query<TResultData<TItem[]>, TItems1Filter>({
      query: ({ listBusinessType, ...params }) => ({
        url:
          "/business/api/services/app/Items/GetListByUser" +
          `?${queryString.stringify({ listBusinessType }, { arrayFormat: "none", skipNull: true })}`,
        params,
      }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),
    GetListItemsByUser2: builder.query<TResultData<TItem[]>, TItems1Filter>({
      query: ({ listBusinessType, ...params }) => ({
        url:
          "/business/api/services/app/Items/GetListByUser" +
          `?${queryString.stringify({ listBusinessType }, { arrayFormat: "none", skipNull: true })}`,
        params,
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (!!arg?.skipCount) {
          const newArr = [...currentCache.data, ...newItems.data];
          currentCache.data = uniqWith((a, b) => a.id === b.id, newArr);
          currentCache.totalRecords = newItems.totalRecords;
        } else {
          currentCache.data = newItems.data;
          currentCache.totalRecords = newItems.totalRecords;
        }
      },
      providesTags: [{ type: "Item", id: "LIST" }],
    }),

    GetListItemsMainPage: builder.query<TResultData<TItem[]>, TItems2Filter>({
      query: (params) => ({ url: "/business/api/services/app/Items/GetListItemsMainPage", params }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),
    GetListItemsRandom: builder.query<TResultData<TItem[]>, TItemsRandomFilter>({
      query: (params) => ({ url: "/business/api/services/app/Items/GetListItemsRandom", params }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),
    GetListFavorite: builder.query<TResultData<TItem[]>, TItemsFavoriteFilter>({
      query: (params) => ({ url: "/business/api/services/app/Items/GetListFavorite", params }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),
    GetById: builder.query<TResultData<TItem>, { id: number }>({
      query: (params) => ({ url: "/business/api/services/app/Items/GetById", params }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),
    GetListByUser: builder.query<TResultData<TItem[]>, { providerId: number }>({
      query: (params) => ({ url: "/business/api/services/app/Items/GetListByUser", params }),
      providesTags: [{ type: "Item", id: "LIST" }],
    }),

    AddFavorite: builder.mutation<TResultData<any>, { id: number }>({
      query: (body) => ({
        url: "/business/api/services/app/Items/AddFavorite",
        body,
        method: "post",
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    RemoveFavorite: builder.mutation<TResultData<any>, { id: number }>({
      query: (body) => ({
        url: "/business/api/services/app/Items/RemoveFavorite",
        body,
        method: "delete",
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    GetCart: builder.query<TResultData<TCart[]>, any>({
      query: () => ({ url: "/business/api/services/app/Items/GetCart" }),
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    UpdateItemCart: builder.mutation<TResultData<any>, TUpdateCartData>({
      query: (body) => ({
        url: "/business/api/services/app/Items/UpdateCart",
        body,
        method: "put",
      }),
      invalidatesTags: [
        { type: "Item", id: "LIST" },
        { type: "Cart", id: "LIST" },
      ],
    }),
    AddItemModelToCart: builder.mutation<TResultData<any>, TAddToCartData>({
      query: (body) => ({
        url: "/business/api/services/app/Items/AddItemModelToCart",
        body,
        method: "post",
      }),
      invalidatesTags: [
        { type: "Item", id: "LIST" },
        { type: "Cart", id: "LIST" },
      ],
    }),

    GetListImageConfig: builder.query<TResponse<TImageConfig[]>, {}>({
      query: (params) => ({ url: "/api/services/app/ImageConfig/UserGetList", params }),
      providesTags: [{ type: "Banner", id: "LIST" }],
    }),

    DeliveryEstimate: builder.mutation<
      {
        totalFee: number;
        expectedDeliveryTime: string;
      },
      Partial<TDeliveryEstimateData>
    >({
      query: (body) => ({
        url: "/business/api/services/app/Deliveries/Estimate",
        body,
        method: "post",
      }),
      invalidatesTags: [{ type: "Delivery", id: "LIST" }],
    }),
    CalculateTotalPrice01: builder.query<
      TResultData<TCalculateTotalPriceRes>,
      Partial<TCalculateTotalPriceData>
    >({
      query: (body) => ({
        url: "/business/api/services/app/Orders/CalculateTotalPrice",
        body,
        method: "post",
      }),
      forceRefetch: ({ currentArg, previousArg }) => {
        return !equals(previousArg, currentArg);
      },
      providesTags: [{ type: "Delivery", id: "CalculateTotalPrice" }],
    }),

    GetListRate: builder.query<TResultData<TRateItem[]>, Partial<TListRateFilter>>({
      query: (params) => ({
        url: "/business/api/services/app/Rates/GetList",
        params,
      }),
      providesTags: [
        { type: "Item", id: "LIST" },
        { type: "Rate", id: "LIST" },
      ],
    }),
    GetListRate2: builder.query<TResultData<TRateItem[]>, Partial<TListRateFilter>>({
      query: (params) => ({
        url: "/business/api/services/app/Rates/GetList",
        params,
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, { arg }) => {
        if (!!arg?.skipCount) {
          const newArr = [...currentCache.data, ...newItems.data];
          const newData = uniqWith((a, b) => a.id === b.id, newArr);
          currentCache.data = newData;
          currentCache.totalRecords = newItems.totalRecords;
        } else {
          currentCache.data = newItems.data;
          currentCache.totalRecords = newItems.totalRecords;
        }
      },
      // forceRefetch: ({ currentArg, previousArg }) => {
      //   return !equals(previousArg, currentArg);
      // },
      providesTags: [
        { type: "Item", id: "LIST" },
        { type: "Rate", id: "LIST" },
      ],
    }),
    GetListFlashSaleByUser: builder.query<
      TResultData<TItemFlashSale[]>,
      TBaseFilter & {
        dateStart?: string;
        dateEnd?: string;
      }
    >({
      query: (filter) => ({
        url: "/business/api/services/app/FlashSaleItems/GetListByUser",
        method: "get",
        params: filter,
      }),
      providesTags: [{ type: "FlashSale", id: "LIST" }],
    }),

    GetListVoucher: builder.query<TResultData<TVoucher[]>, Partial<TListVoucherFilter>>({
      query: (params) => ({
        url: "/business/api/services/app/Vouchers/GetListByUser",
        params,
      }),
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),
    GetListVoucher2: builder.query<Record<string, TVoucher[]>, { providerIds: number[] }>({
      async queryFn({ providerIds }, _queryApi, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(
          providerIds.map((p) =>
            fetchWithBQ({
              url: "/business/api/services/app/Vouchers/GetListByUser",
              params: {
                providerId: p,
                scope: 1,
                maxResultCount: 10,
                channelDisplay: 1,
                type: 2,
                sortBy: 2,
                formId: 32,
              },
            }),
          ),
        );
        const mappedRes = groupBy(
          (r) => r.providerId,
          results.map((r) => (r.data as any)?.data || []).flat(),
        );

        return { data: mappedRes };
      },
    }),
    ReceiveVoucher: builder.mutation<TResultData<boolean>, { id: number }>({
      query: (data) => ({
        url: "/business/api/services/app/Vouchers/Receive",
        method: "post",
        body: data,
      }),
      invalidatesTags: [{ type: "Voucher", id: "LIST" }],
    }),
    CheckAvailableVoucher: builder.mutation<TResultData<boolean[]>, { items: number[] }>({
      query: (data) => ({
        url: "/business/api/services/app/Vouchers/CheckAvailable",
        method: "post",
        body: data,
      }),
      invalidatesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    CreateOrder: builder.mutation<TResultData<number>, TCreateOrderData>({
      query: (body) => ({
        url: "/business/api/services/app/Orders/Create",
        body,
        method: "post",
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Item", id: "LIST" },
        { type: "Voucher", id: "LIST" },
        { type: "Cart", id: "LIST" },
      ],
    }),
  }),
});
