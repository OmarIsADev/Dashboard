import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import tasksSlice from "./slices/tasksSlice";
import postsSlice from "./slices/postsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    tasks: tasksSlice,
    posts: postsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
