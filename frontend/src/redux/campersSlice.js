import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios.js";

const initialState = {
  items: [],
  total: 0,
  loading: false,
  loadMoreLoading: false,
  error: null,
};

export const fetchCampers = createAsyncThunk(
  "campersSlice/fetchCampers",
  async ({ offset = 0, limit = 4, filters = {} }) => {
    const response = await api.post("/campers", {
      offset,
      limit,
      filters,
    });
    return response.data;
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampers.pending, (state, action) => {
      if (action.meta.arg.offset === 0) {
        state.loading = true;
      } else {
        state.loadMoreLoading = true;
      }
    });
    builder.addCase(fetchCampers.fulfilled, (state, action) => {
      state.loading = false;
      state.loadMoreLoading = false;
      state.total = action.payload.total;
      const offset = action.meta.arg.offset;

      state.items =
        offset === 0
          ? action.payload.items
          : [...state.items, ...action.payload.items];
    });
    builder.addCase(fetchCampers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default campersSlice.reducer;
