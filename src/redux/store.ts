import { Middleware, combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./query/auth-query";
import { categoryApi } from "./query/category-query";
import { itemApi } from "./query/item-query";
import { itemAttributeApi } from "./query/itemAttribute-query";
import { providerApi } from "./query/provider-query";
import { vauApi } from "./query/province-query";
import { userApi } from "./query/user-query";
import { voucherApi } from "./query/voucher-query";
import authReducer, {
  setAccessToken,
  setEncryptedAccessToken,
  setFcmToken,
  setRefreshToken,
} from "./reducer/auth-reducer";
import checkoutReducer from "./reducer/checkout-reducer";
import userReducer, { setUser } from "./reducer/user-reducer";

const reducers = combineReducers({
  // ** Need to add after creating redux slice
  auth: authReducer,
  user: userReducer,
  checkout: checkoutReducer,
  // *** Need to add after createApi from redux-query
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [providerApi.reducerPath]: providerApi.reducer,
  [voucherApi.reducerPath]: voucherApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [itemAttributeApi.reducerPath]: itemAttributeApi.reducer,
  [vauApi.reducerPath]: vauApi.reducer,
});

// const persistedReducer = persistReducer(
//   { key: "root", version: 1, storage: new CookieStorage(Cookies), whitelist: ["auth"] },
//   reducers,
// );

const persistedReducer = persistReducer(
  { key: "root", version: 1, storage: storage, whitelist: ["auth"] },
  reducers,
);

const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (process.env.NODE_ENV !== "production") console.warn("ErrorLogger:", action.payload);
    // [403, 500, "FETCH_ERROR"]
    if ([403].includes(action.payload.status)) {
      api.dispatch(setAccessToken(null));
      api.dispatch(setRefreshToken(null));
      api.dispatch(setEncryptedAccessToken(null));
      api.dispatch(setFcmToken(null));
      api.dispatch(setUser(null));
      window.history.replaceState({}, "", "/login");
    }
    // const { status, data } = action.payload;
    // if (![404, 401].includes(status))
    //   message.error({ content: `${status || 400} : ${data?.err || "Đã có lỗi xảy ra"}` });
  }

  return next(action);
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(
      // *** Need to add after createApi from redux-query
      authApi.middleware,
      userApi.middleware,
      itemApi.middleware,
      providerApi.middleware,
      categoryApi.middleware,
      itemAttributeApi.middleware,
      voucherApi.middleware,
      vauApi.middleware,
      rtkQueryErrorLogger,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
