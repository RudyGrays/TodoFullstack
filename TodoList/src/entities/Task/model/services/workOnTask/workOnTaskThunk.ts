import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/TaskSchema";
import { getTasksThunk } from "../getTasks/getTasksThunk";

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

    dispatch(getTasksThunk({}));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
