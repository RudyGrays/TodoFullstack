import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/TaskSchema";
import { getTasksThunk } from "../getTasks/getTasksThunk";

import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";

interface Response {
  message: string;
  task: Task;
}

export const workOnTaskThunk = createAsyncThunk<
  Response,
  string,
  ThunkConfig<string>
>("workOnTaskThunk", async (url, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.patch<Response>(
      `/tasks/workOnTask/${url}`
    );
    dispatch(useNotificationThunk(response.data.message));
    dispatch(getTasksThunk({}));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
