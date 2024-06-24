import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type singleCommentState = {
  id?: number;
  desc?: string;
  name?: string;
  userId?: number;
  postId?: number;
  profilePic?: string;
  createdAt?: string;
};

export type allCommentsState = {
  postId?: number;
  comments?: singleCommentState[];
};

const initialState: allCommentsState[] = [];

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    removeComments(state) {
      state.splice(0);
      return state;
    },
    setComments(state, action: PayloadAction<allCommentsState>) {
      const foundPostIndex = state.findIndex(
        (item) => item.postId === action.payload.postId
      );
      if (foundPostIndex < 0) {
        state.push(action.payload);
      } else {
        state[foundPostIndex].comments = action.payload.comments;
      }
      return state;
    },

    addComment(state, action: PayloadAction<singleCommentState>) {
      let foundPost = state.find(
        (item) => item.postId === action.payload.postId
      );
      if (foundPost) foundPost.comments?.unshift(action.payload);
      return state;
    }
  }
});

export const { setComments, addComment, removeComments } =
  commentsSlice.actions;
