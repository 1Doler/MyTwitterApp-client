import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/FetchPosts",
  async (params) => {
    const { data } = await axios.get(
      `/posts/?sort=${params.sort}${params?.tag ? "&tags=" + params.tag : ""}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
);
export const fetchTags = createAsyncThunk("posts/FetchTags", async () => {
  const { data } = await axios.get("/posts/tags");
  return data;
});
export const fetchRemovePost = createAsyncThunk(
  "posts/FetchRemovePost",
  async (id) => {
    const { data } = await axios.delete("/posts/" + id, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id != action.meta.arg
      );
      state.posts.status = "loaded";
    },
  },
});

export const postsReducer = postsSlice.reducer;
