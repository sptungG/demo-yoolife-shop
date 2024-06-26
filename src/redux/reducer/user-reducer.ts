import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TUser } from "@/types/user-type";

import { authApi } from "../query/auth-query";
import { userApi } from "../query/user-query";

type TState = { data: TUser | null };
const initialState: TState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser | null>) {
      if (action.payload == null) state.data = null;
      else state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, { payload }) => {
      state.data = payload.result;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
      state.data = null;
    });
    builder.addMatcher(authApi.endpoints.logout.matchRejected, (state, { payload }) => {
      state.data = null;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
