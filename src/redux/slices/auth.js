import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async params => {
    const { data } = await axios.post("/auth/login", params, {
      withCredentials: true,
    });
    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async params => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);
export const fetchUserDataMe = createAsyncThunk(
  "auth/fetchUserData",
  async () => {
    const { data } = await axios.get("/auth/getprofile", {
      withCredentials: true,
    });
    return data;
  }
);
export const fetchUpdateProfile = createAsyncThunk(
  "fetchUpdateProfile",
  async userData => {
    const { data } = await axios.patch("/auth/update", userData, {
      withCredentials: true,
    });
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: state => {
      state.data = null;
      state.status = "loading";
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUserData.error]: state => {
      state.data = null;
      state.status = "error";
    },
    [fetchUserDataMe.pending]: state => {
      state.data = null;
      state.status = "loading";
    },
    [fetchUserDataMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUserDataMe.error]: state => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegister.pending]: state => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.error]: state => {
      state.data = null;
      state.status = "error";
    },
    [fetchUpdateProfile.pending]: state => {
      state.status = "loading";
    },
    [fetchUpdateProfile.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUpdateProfile.error]: state => {
      state.status = "error";
    },
  },
});

export const selectIsAuth = state => !!state.auth.data;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
