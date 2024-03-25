import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TCart, TEPaymentMethods, TVoucher } from "@/types/item-type";
import { TUserAddress } from "@/types/user-type";

import { userApi } from "../query/user-query";

type TState = {
  toAddress: TUserAddress | null;
  selectedItems: TCart[];
  voucherShipping: TVoucher | null;
  voucherProvider: TVoucher | null;
  paymentMethod: number | null;
  deliveryProvider: number | null;
};
const initialState: TState = {
  toAddress: null,
  selectedItems: [],
  voucherShipping: null,
  voucherProvider: null,
  deliveryProvider: null,
  paymentMethod: TEPaymentMethods.COD,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutAddress(state, action: PayloadAction<TUserAddress | null>) {
      state.toAddress = action.payload;
    },
    setCheckoutSelectedItems(state, action: PayloadAction<TCart[]>) {
      state.selectedItems = action.payload;
    },
    setCheckoutVoucherShipping(state, action: PayloadAction<TVoucher | null>) {
      state.voucherShipping = action.payload;
    },
    setCheckoutVoucherProvider(state, action: PayloadAction<TVoucher | null>) {
      state.voucherProvider = action.payload;
    },
    setCheckoutDeliveryProvider(state, action: PayloadAction<number | null>) {
      state.deliveryProvider = action.payload;
    },
    setCheckoutPaymentMethod(state, action: PayloadAction<number | null>) {
      state.paymentMethod = action.payload;
    },
    resetCheckout(state, action: PayloadAction<void>) {
      state.voucherShipping = null;
      state.voucherProvider = null;
      state.deliveryProvider = null;
      state.paymentMethod = TEPaymentMethods.COD;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.GetListAddress.matchFulfilled, (state, { payload }) => {
      state.toAddress = payload.data?.find((a) => !!a?.default) || null;
    });
  },
});

export const {
  setCheckoutAddress,
  setCheckoutSelectedItems,
  setCheckoutVoucherProvider,
  setCheckoutVoucherShipping,
  setCheckoutDeliveryProvider,
  setCheckoutPaymentMethod,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
