import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { SubordinateSchema } from "../types/SubordinatesSchema";
import { User } from "@/entities/User";
import { getSubordinatesThunk } from "../services/getSubordinates/getSubordinatesThunk";
import { addSubordinateThunk } from "../services/addSubordinate/addSubordinateThunk";
import { removeSubordinateThunk } from "../services/removeSubordinate/removeSubordinateThunk";

const initialState: SubordinateSchema = {
  error: undefined,
  ids: [],
  entities: {},
  isLoading: false,
};

export const SubordinateAdapter = createEntityAdapter({
  selectId: (subordinate: User) => subordinate.id,
});

export const SubordinateSlice = createSlice({
  name: "subordinates",
  initialState: SubordinateAdapter.getInitialState<Partial<SubordinateSchema>>({
    ...initialState,
  }),
  reducers: {
    initialState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubordinatesThunk.pending, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(getSubordinatesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        SubordinateAdapter.setAll(state, action.payload.users);
      })
      .addCase(getSubordinatesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addSubordinateThunk.pending, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(addSubordinateThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(addSubordinateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(removeSubordinateThunk.pending, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(removeSubordinateThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(removeSubordinateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: SubordinatesReducer, actions: SubordinatesActions } =
  SubordinateSlice;
