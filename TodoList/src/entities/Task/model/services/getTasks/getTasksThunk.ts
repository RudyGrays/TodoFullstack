import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../types/TaskSchema";

interface Response {
  message: string;
  tasks: Task[];
}
interface Props {
  byAssignee?: string;
  groupBy?: "today" | "week" | "future" | "all";
}
export const getTasksThunk = createAsyncThunk<
  Response,
  Props,
  ThunkConfig<string>
>(
  "getTasksThunk",
  async ({ byAssignee, groupBy }, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Response>("/tasks", {
        params: {
          byAssignee,
          groupBy,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
