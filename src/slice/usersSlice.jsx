import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (usersData, thunkAPI) => {
    try {
      const res = await request.post("/api/auth/register", usersData);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async (usersData, thunkAPI) => {
    try {
      const res = await request.put(
        `/api/auth/users/${usersData.idUser}`,
        usersData
      );
      console.log(res?.data);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (idUser, thunkAPI) => {
    try {
      const res = await request.delete(`/api/auth/users/${idUser}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user.idUser === updatedUser.idUser
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user.idUser !== action.payload.idUser
        );
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { listUsers } = usersSlice.actions;
export default usersSlice.reducer;
