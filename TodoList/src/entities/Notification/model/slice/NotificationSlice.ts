import { createSlice } from "@reduxjs/toolkit";
import { NotificationSchema } from "../types/NotificationSchema";

const initialState: NotificationSchema = {
  message: undefined,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    removeNotification: () => initialState,
  },
});

export const { reducer: notificationReducer, actions: notificationActions } =
  NotificationSlice;
