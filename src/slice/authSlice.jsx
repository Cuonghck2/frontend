import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";

export const signUserAsync = createAsyncThunk(
  "auth/signUserAsync",
  async (usersData, thunkAPI) => {
    try {
      const res = await request.post("/api/register", usersData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (usersData, thunkAPI) => {
    try {
      const res = await request.post("/api/login", usersData);
      console.log(res);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUserAsync",
  async (usersData, thunkAPI) => {
    console.log(usersData);
    try {
      const res = await request.post("/api/logout", usersData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
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
        state.users = action.payload;
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
        state.users = action.payload;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { getUser } = authSlice.actions;
export default authSlice.reducer;
