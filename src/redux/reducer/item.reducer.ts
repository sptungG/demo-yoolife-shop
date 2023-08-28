import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items } from "../../types/item.types";
import { itemApi } from "../query/item.query";
type TState = { data: Items | null };
const initialState: TState = {
  data: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Items | null>) {
      if (action.payload == null) state.data = null;
      else state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(itemApi.endpoints.getItemsByUser.matchFulfilled, (state, { payload }) => {
      state.data = payload.result;
    });
  },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
