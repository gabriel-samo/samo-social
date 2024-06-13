import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type profileState = {
  id?: number;
  name?: string;
  email?: string;
  city?: string;
  username?: string;
  coverPic?: string;
  profilePic?: string;
  website?: null;
};

const initialState: profileState = {};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<profileState>) {
      state = action.payload;
      return state;
    },
    removeProfile(state) {
      state = {};
      return state;
    }
  }
});

export const { setProfile, removeProfile } = profileSlice.actions;
