import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/TaskSchema";

interface Response {
  message: string;
  task: Task;
}

export const cancelTaskThunk = createAsyncThunk<
  Response,
  string,
  ThunkConfig<string>
>("cancelTaskThunk", async (url, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.patch<Response>(`/tasks/cancel/${url}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
