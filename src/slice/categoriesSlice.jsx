import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../utils/request";

export const addCategoriesAsync = createAsyncThunk(
  "categories/addCategoriesAsync",
  async (categories, thunkAPI) => {
    try {
      const res = await request.post("/api/categories", categories);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategoriesAsync = createAsyncThunk(
  "categories/updateCategoriesAsync",
  async (categoriesData, thunkAPI) => {
    console.log("thunksAPI", categoriesData.idCategories);
    try {
      const res = await request.put(
        `/api/categories/${categoriesData.idCategories}`,
        categoriesData
      );
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCategoriesAsync = createAsyncThunk(
  "categories/deleteCategoriesAsync",
  async (idCategories, thunkAPI) => {
    try {
      const res = await request.delete(`/api/categories/${idCategories}`);
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    listCategories: (state, action) => {
      state.categories = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //Add
      .addCase(addCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategoriesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //Update
      .addCase(updateCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updateCategories = action.payload;
        const categoriesIndex = state.categories.findIndex(
          (category) => category.idCategories === updateCategories.idCategories
        );
        if (categoriesIndex !== -1) {
          state.categories[categoriesIndex] = updateCategories;
        }
      })
      .addCase(updateCategoriesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //Delete
      .addCase(deleteCategoriesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedCategoryId = action.payload;
        state.categories = state.categories.filter(
          (category) => category.idCategories !== deletedCategoryId.idCategories
        );
      })
      .addCase(deleteCategoriesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { listCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
