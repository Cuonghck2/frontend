import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";
export const addMemberSync = createAsyncThunk(
  "members/addMemberSync",
  async (membersData, thunkAPI) => {
    try {
      const res = await request.post("/api/members", membersData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uppdateMemberSync = createAsyncThunk(
  "members/uppdateMemberSync",
  async (membersData, thunkAPI) => {
    try {
      const res = await request.put(
        `/api/members/${membersData.idMember}`,
        membersData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteMemberSync = createAsyncThunk(
  "members/deleteMemberSync",
  async (idMember, thunkAPI) => {
    try {
      const res = await request.delete(`/api/members/${idMember}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listMember: (state, action) => {
      state.members = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMemberSync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMemberSync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members.push(action.payload);
      })
      .addCase(addMemberSync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(uppdateMemberSync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uppdateMemberSync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedMember = action.payload;
        const memberIndex = state.members.findIndex(
          (member) => member.idMember === updatedMember.idMember
        );
        if (memberIndex !== -1) {
          state.members[memberIndex] = updatedMember;
        }
      })
      .addCase(uppdateMemberSync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMemberSync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMemberSync.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedMember = action.payload;
        state.members = state.members.filter(
          (member) => member.idMember !== deletedMember.idMember
        );
      })
      .addCase(deleteMemberSync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { listMember } = membersSlice.actions;
export default membersSlice.reducer;
