import { createApi } from "@reduxjs/toolkit/query/react";

import { TResponse, TResultData } from "@/types/response-type";
import { TVoucher } from "@/types/voucher-type";

import { baseQueryWithReauth } from "../app/baseQueryWithReauth";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Voucher"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    GetListVoucherByUser: builder.query<TResultData<TVoucher[]>, { providerId: number }>({
      query: (params) => ({ url: "/business/api/services/app/Vouchers/GetListByUser", params }),
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),
    GetListVoucherByUser2: builder.query<any, { providerIds: number[] }>({
      async queryFn({ providerIds }, _queryApi, _extraOptions, fetchWithBQ) {
        const results = await Promise.all(
          providerIds.map((p) =>
            fetchWithBQ({
              url: "/business/api/services/app/Vouchers/GetListByUser",
              params: { providerId: p },
            }),
          ),
        );
        return { data: results };
      },
    }),
  }),
});
