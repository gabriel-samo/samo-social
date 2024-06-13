import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type singleRelationshipState = {
  followedUserId: number;
  followerUserId: number;
};

export type allRelationshipsState = {
  followedUserId?: number;
  followersUserIds?: number[];
};

const initialState: allRelationshipsState[] = [];

export const relationshipsSlice = createSlice({
  name: "relationships",
  initialState,
  reducers: {
    removeRelationships(state) {
      state.splice(0);
      return state;
    },
    setRelationships(state, action: PayloadAction<allRelationshipsState>) {
      const foundPostIndex = state.findIndex(
        (item) => item.followedUserId === action.payload.followedUserId
      );
      if (foundPostIndex < 0) {
        state.push(action.payload);
      } else {
        state[foundPostIndex].followersUserIds =
          action.payload.followersUserIds;
      }
      return state;
    },

    addRelationship(state, action: PayloadAction<singleRelationshipState>) {
      let foundPost = state.find(
        (item) => item.followedUserId === action.payload.followedUserId
      );
      if (foundPost) {
        let foundUserIdIndex = foundPost.followersUserIds?.findIndex(
          (item) => item === action.payload.followerUserId
        );
        if (foundUserIdIndex! >= 0) {
          foundPost.followersUserIds?.splice(foundUserIdIndex!, 1);
        } else {
          foundPost.followersUserIds?.push(action.payload.followerUserId);
        }
      }
      return state;
    }
  }
});

export const { setRelationships, addRelationship, removeRelationships } =
  relationshipsSlice.actions;
