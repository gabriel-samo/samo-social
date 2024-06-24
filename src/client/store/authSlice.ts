import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

type userState = {
  id?: number;
  name?: string;
  profilePic?: string;
  token?: string;
};

const initialState: userState =
  JSON.parse(localStorage.getItem("samosocial-current-user") || "{}") || {};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<string>) {
      const receivedToken = action.payload;
      if (receivedToken && receivedToken.length > 10) {
        const decodedToken = decodeToken<userState>(receivedToken);
        state = {
          id: decodedToken?.id,
          name: decodedToken?.name,
          profilePic: decodedToken?.profilePic,
          token: `Bearer ${action.payload}`
        };
        localStorage.setItem("samosocial-current-user", JSON.stringify(state));
        return state;
      }
    },
    addNewToken(state, action: PayloadAction<string>) {
      if (action.payload.length > 10) {
        state!.token = action.payload;
        localStorage.setItem("samosocial-current-user", JSON.stringify(state));
        return state;
      }
    },
    logoutUser(state) {
      state = {};
      localStorage.setItem("samosocial-current-user", JSON.stringify(state));
      return state;
    }
  }
});

export const { loginUser, addNewToken, logoutUser } = authSlice.actions;
