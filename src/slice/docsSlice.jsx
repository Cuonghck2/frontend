import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";

export const addDocsAsync = createAsyncThunk(
  "docs/addDocsAsync",
  async (docsData, thunkAPI) => {
    try {
      const res = await request.post("/api/document", docsData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteDocsAsync = createAsyncThunk(
  "docs/deleteDocsAsync",
  async (id, thunkAPI) => {
    try {
      const res = await request.delete(`/api/document/delete/${id}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const docsSlice = createSlice({
  name: "docs",
  initialState: {
    docs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listDocs: (state, action) => {
      state.docs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDocsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDocsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.docs.push(action.payload.document);
      })
      .addCase(addDocsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deleteDocsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.docs = state.docs.filter((doc) => doc.id !== action.payload.id);
      })
      .addCase(deleteDocsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { listDocs } = docsSlice.actions;
export default docsSlice.reducer;
