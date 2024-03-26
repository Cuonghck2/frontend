import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";

export const addLeaderAsync = createAsyncThunk(
  "leaders/addLeaderAsync",
  async (leaderData, thunkAPI) => {
    try {
      const res = await request.post("/api/topicLeader", leaderData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateLeaderAsync = createAsyncThunk(
  "leaders/updateLeaderAsync",
  async (leaderData, thunkAPI) => {
    console.log("thunksAPI", leaderData);
    try {
      const res = await request.put(
        `/api/topicLeader/${leaderData.idLeader}`,
        leaderData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteLeaderAsync = createAsyncThunk(
  "leaders/deleteLeaderAsync",
  async (idLeader, thunkAPI) => {
    try {
      const res = await request.delete(`/api/topicLeader/${idLeader}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const leadersSlice = createSlice({
  name: "leaders",
  initialState: {
    leaders: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listLeader: (state, action) => {
      state.leaders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Add
      .addCase(addLeaderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLeaderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaders.push(action.payload);
      })
      .addCase(addLeaderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Update
      .addCase(updateLeaderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLeaderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedLeader = action.payload;
        const leaderIndex = state.leaders.findIndex(
          (leader) => leader.idLeader === updatedLeader.idLeader
        );
        if (leaderIndex !== -1) {
          state.leaders[leaderIndex] = updatedLeader;
        }
      })
      .addCase(updateLeaderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //Delete
      .addCase(deleteLeaderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLeaderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedLeaderId = action.payload;
        state.leaders = state.leaders.filter(
          (leader) => leader.idLeader !== deletedLeaderId.idLeader
        );
      })
      .addCase(deleteLeaderAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { listLeader, updateLeader, deleteLeader } = leadersSlice.actions;
export default leadersSlice.reducer;
