import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type singleLikeState = {
  postId: number;
  userId: number;
};

export type allLikesState = {
  postId?: number;
  usersIds?: number[];
};

const initialState: allLikesState[] = [];

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    removeLikes(state) {
      state.splice(0);
      return state;
    },
    setLikes(state, action: PayloadAction<allLikesState>) {
      const foundPostIndex = state.findIndex(
        (item) => item.postId === action.payload.postId
      );
      if (foundPostIndex < 0) {
        state.push(action.payload);
      } else {
        state[foundPostIndex].usersIds = action.payload.usersIds;
      }
      return state;
    },

    addLike(state, action: PayloadAction<singleLikeState>) {
      let foundPost = state.find(
        (item) => item.postId === action.payload.postId
      );
      if (foundPost) {
        let foundUserIdIndex = foundPost.usersIds?.findIndex(
          (item) => item === action.payload.userId
        );
        if (foundUserIdIndex! >= 0) {
          foundPost.usersIds?.splice(foundUserIdIndex!, 1);
        } else {
          foundPost.usersIds?.push(action.payload.userId);
        }
      }
      return state;
    }
  }
});

export const { setLikes, addLike, removeLikes } = likesSlice.actions;
