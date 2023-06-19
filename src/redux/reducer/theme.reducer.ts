import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TState = {
  mode: "light" | "dark";
};

const initialState: TState = {
  mode: "light",
};
const themeProviderSlice = createSlice({
  name: "themeProvider",
  initialState: initialState,
  reducers: {
    toggleThemeMode(state, action: PayloadAction<null>) {
      if (state.mode === "light") {
        state.mode = "dark";
      } else {
        state.mode = "light";
      }
    },
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
    // setThemeColors(state, action: PayloadAction<string>) {
    //   state.colorPrimary = action.payload;
    //   state.generatedColors = generate(action.payload);
    // },
  },
});

export const { setThemeMode, toggleThemeMode } = themeProviderSlice.actions;

export default themeProviderSlice.reducer;
