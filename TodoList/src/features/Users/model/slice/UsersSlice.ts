import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { User } from "@/entities/User";

import { UsersSchema } from "../types/UsersSchema";
import { getUsersThunk } from "../services/getUsers/getUsersThunk";

const initialState: UsersSchema = {
  error: undefined,
  ids: [],
  entities: {},
  isLoading: false,
};

export const UsersAdapter = createEntityAdapter({
  selectId: (user: User) => user.id,
});

export const UsersSlice = createSlice({
  name: "users",
  initialState: UsersAdapter.getInitialState({
    ...initialState,
  }),
  reducers: {
    initialState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        UsersAdapter.setAll(state, action.payload.users);
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: UsersReducer, actions: UsersActions } = UsersSlice;
