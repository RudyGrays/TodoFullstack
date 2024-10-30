import { createAsyncThunk } from "@reduxjs/toolkit";

export const useNotificationThunk = createAsyncThunk(
  "useNotificationThunk",
  async (value: string) => {
    return value;
  }
);
