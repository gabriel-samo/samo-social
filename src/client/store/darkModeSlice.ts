import { createSlice } from "@reduxjs/toolkit";

type darkModeState = boolean;

const initialState: darkModeState =
  JSON.parse(localStorage.getItem("samosocial-dark-mode") || "false") || false;

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state = !state;
      localStorage.setItem("samosocial-dark-mode", JSON.stringify(state));
      return state;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
