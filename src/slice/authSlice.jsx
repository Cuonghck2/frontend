import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";

export const signUserAsync = createAsyncThunk(
  "auth/signUserAsync",
  async (authData, thunkAPI) => {
    try {
      const res = await request.post("/api/auth/register", authData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (authData, thunkAPI) => {
    try {
      const res = await request.post("/api/auth/login", authData);
      console.log(res);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUserAsync",
  async (authData, thunkAPI) => {
    try {
      const res = await request.post("/api/auth/logout");
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: [],
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth.push(action.payload);
      })
      .addCase(signUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auth = action.payload;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { getUser } = authSlice.actions;
export default authSlice.reducer;
