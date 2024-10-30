import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskProps } from "../../types/TaskSchema";
import { getTasksThunk } from "../getTasks/getTasksThunk";

interface Response {
  message: string;
  task: Task;
}
interface Props {
  data: Partial<TaskProps>;
  url: string;
}
export const updateTaskThunk = createAsyncThunk<
  Response,
  Props,
  ThunkConfig<string>
>("updateTasksThunk", async (props, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.patch<Response>(
      `/tasks/update/${props.url}`,
      {
        data: props.data,
      }
    );

    dispatch(getTasksThunk({}));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
