import { combineReducers, configureStore, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./query/auth.query";
import { itemApi } from "./query/item.query";
import { userApi } from "./query/user.query";
import authReducer, { setAccessToken, setRefreshToken } from "./reducer/auth.reducer";
import itemReducer from "./reducer/item.reducer";
import themeReducer from "./reducer/theme.reducer";
import userReducer, { setUser } from "./reducer/user.reducer";
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  item: itemReducer,
  theme: themeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistReducerConfig = getPersistConfig({
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["auth", "theme"],
  rootReducer: reducers,
});

const persistedReducer = persistReducer(persistReducerConfig, reducers);

const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (process.env.NODE_ENV !== "production") console.warn("38:", action.payload);
    // [403, 500, "FETCH_ERROR"]
    if ([403].includes(action.payload.status)) {
      api.dispatch(setAccessToken(null));
      api.dispatch(setRefreshToken(null));
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
    gDM({ serializableCheck: false }).concat(
      userApi.middleware,
      authApi.middleware,
      itemApi.middleware,
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
