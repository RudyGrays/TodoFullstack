import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

import { TaskAdapter } from "../slice/TaskSlice";

export const getTaskSelectors = TaskAdapter.getSelectors<StateSchema>(
  (state) => state.task || TaskAdapter.getInitialState()
);

export const getTaskError = (state: StateSchema) => state.task.error || "";
export const getTaskLoading = (state: StateSchema) =>
  state.task.isLoading || false;
