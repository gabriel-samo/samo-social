import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type postState = {
  id?: number;
  img?: string;
  desc?: string;
  name?: string;
  userId?: number;
  createdAt?: string;
  profilePic?: string;
};

const initialState: postState[] = [];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePosts(state) {
      state.splice(0);
      return state;
    },
    setPosts(state, action: PayloadAction<postState[]>) {
      state = action.payload;
      return state;
    },

    addPost(state, action: PayloadAction<postState>) {
      state = [action.payload, ...state];
      return state;
    }
  }
});

export const { setPosts, addPost, removePosts } = postsSlice.actions;
