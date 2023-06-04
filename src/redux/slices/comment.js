import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCommentPost = createAsyncThunk(
  "commentPost/FetchCommentPost",
  async params => {
    const { data } = await axios.get(`/comment/${params.postId}`);
    return data;
  }
);
export const fetchComment = createAsyncThunk(
  "commentPost/FetchCommentPost",
  async () => {
    const { data } = await axios.get(`/comment`);
    return data;
  }
);
export const fetchAddCommentPost = createAsyncThunk(
  "addCommentPost/FetchAddCommentPost",
  async params => {
    const { data } = await axios.post(`/comment/${params.postId}`, {
      ...params,
    });
    console.log(data);
    return data;
  }
);

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCommentPost.pending]: state => {
      state.comments.status = "loading";
    },
    [fetchCommentPost.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentPost.rejected]: (state, action) => {
      state.comments.status = "error";
    },
    [fetchComment.pending]: state => {
      state.comments.status = "loading";
    },
    [fetchComment.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComment.rejected]: (state, action) => {
      state.comments.status = "error";
    },
    [fetchAddCommentPost.pending]: state => {
      state.comments.status = "loading";
    },
    [fetchAddCommentPost.fulfilled]: (state, action) => {
      state.comments.items = [...state.comments.items, action.payload];
      state.comments.status = "loaded";
    },
    [fetchAddCommentPost.rejected]: (state, action) => {
      state.comments.status = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
