import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../utils/request";
export const addTopicsAsync = createAsyncThunk(
  "topics/addTopicsAsync",
  async (topicsData, thunkAPI) => {
    try {
      const res = await request.post("/api/topics", topicsData);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTopicsAsync = createAsyncThunk(
  "leaders/updateTopicsAsync",
  async (topicsData, thunkAPI) => {
    console.log("thunksAPI", topicsData.idTopic);
    try {
      const res = await request.put(
        `/api/topics/${topicsData.idTopic}`,
        topicsData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTopicsAsync = createAsyncThunk(
  "topics/deleteTopicsAsync",
  async (idTopic, thunkAPI) => {
    try {
      const res = await request.delete(`/api/topics/${idTopic}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listTopics: (state, action) => {
      state.topics = action.payload;
    },
    //   addTopic: (state, action) => {
    //     const data = action.payload;
    //     const newData = {
    //       data: data,
    //     };
    //     state.topics.push(newData);
    //   },
    //   updateTopic: (state, action) => {
    //     let findData = state.topics.find((item) => {
    //       return item.id === action.payload.id;
    //     });
    //     if (findData) {
    //       findData.data.data = action.payload.data;
    //     }
    //   },
    //   deleteTopic: (state, action) => {
    //     let index = state.topics.findIndex((item) => {
    //       return item.id === action.payload;
    //     });
    //     if (index !== -1) {
    //       state.topics.splice(index, 1);
    //     }
    //   },
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTopicsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTopicsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics.push(action.payload);
      })
      .addCase(addTopicsAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTopicsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTopicsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTopics = action.payload;
        const topicIndex = state.topics.findIndex(
          (topic) => topic.idTopic === updatedTopics.idTopic
        );
        if (topicIndex !== -1) {
          state.topics[topicIndex] = updatedTopics;
        }
      })
      .addCase(updateTopicsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTopicsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTopicsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const idTopic = action.payload?.idTopic;
        state.topics = state.topics.filter(
          (topic) => topic.idTopic !== idTopic
        );
      })
      .addCase(deleteTopicsAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { listTopics, addTopic, updateTopic, deleteTopic } =
  topicsSlice.actions;
export default topicsSlice.reducer;
