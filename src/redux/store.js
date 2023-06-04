import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, authReducer, commentsReducer } from "./slices/index";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});

export default store;
