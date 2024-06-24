// npm install @reduxjs/toolkit react-redux

import { authSlice } from "./authSlice";
import { postsSlice } from "./postsSlice";
import { likesSlice } from "./likesSlice";
import { profileSlice } from "./profileSlice";
import { commentsSlice } from "./commentsSlice";
import { darkModeSlice } from "./darkModeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { relationshipsSlice } from "./relationshipsSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    likes: likesSlice.reducer,
    profile: profileSlice.reducer,
    currentUser: authSlice.reducer,
    darkMode: darkModeSlice.reducer,
    comments: commentsSlice.reducer,
    relationships: relationshipsSlice.reducer
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
