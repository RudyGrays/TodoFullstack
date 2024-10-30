import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Task, TaskSchema } from "../types/TaskSchema";
import { getTasksThunk } from "../services/getTasks/getTasksThunk";
import { updateTaskThunk } from "../services/updateTask/updateTaskThunk";
import { workOnTaskThunk } from "../services/workOnTask/workOnTaskThunk";
import { completeTaskThunk } from "../services/completeTask/completeTaskThunk";
import { cancelTaskThunk } from "../services/cancelTask/cancelTaskThunk";

const initialState: TaskSchema = {
  error: undefined,
  ids: [],
  entities: {},
  isLoading: false,
};

export const TaskAdapter = createEntityAdapter({
  selectId: (task: Task) => task.id,
});

export const TaskSlice = createSlice({
  name: "task",
  initialState: TaskAdapter.getInitialState<Partial<TaskSchema>>({
    ...initialState,
  }),
  reducers: {
    initialState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getTasksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        TaskAdapter.setAll(state, action.payload.tasks);
      })
      .addCase(getTasksThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateTaskThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateTaskThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(workOnTaskThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(workOnTaskThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(workOnTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(completeTaskThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(completeTaskThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(completeTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(cancelTaskThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(cancelTaskThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(cancelTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: TaskReducer, actions: TaskActions } = TaskSlice;
