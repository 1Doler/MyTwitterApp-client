import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, authReducer } from "./slices/index";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
