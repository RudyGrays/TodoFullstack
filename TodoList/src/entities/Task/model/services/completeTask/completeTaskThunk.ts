import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/TaskSchema";

import { notificationActions } from "@/entities/Notification";
import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";

interface Response {
  message: string;
  task: Task;
}

export const completeTaskThunk = createAsyncThunk<
  Response,
  string,
  ThunkConfig<string>
>("completeTaskThunk", async (url, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.patch<Response>(`/tasks/complete/${url}`);
    dispatch(notificationActions.setNotification(response.data.message));
    dispatch(useNotificationThunk(response.data.message));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
