import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskDTO, TaskProps } from "../../types/TaskSchema";

import { getTasksThunk } from "../getTasks/getTasksThunk";

export const CreateTaskThunk = createAsyncThunk<
  TaskDTO,
  TaskProps,
  ThunkConfig<string>
>("CreateTaskThunk", async (props, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.post<TaskDTO>("/tasks", props);
    dispatch(getTasksThunk({}));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
