import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type postState = {
  id?: number;
  img?: string;
  desc?: string;
  name?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
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
    },

    updatePost(state, action: PayloadAction<postState>) {
      let foundPost = state.find((post) => post.id === action.payload.id);
      if (foundPost) {
        foundPost = { ...action.payload };
      }
      return state;
    }
  }
});

export const { setPosts, addPost, removePosts, updatePost } =
  postsSlice.actions;
