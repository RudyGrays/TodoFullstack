import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { UsersAdapter } from "../slice/UsersSlice";

export const getUsersSelectors = UsersAdapter.getSelectors<StateSchema>(
  (state) => state.users || UsersAdapter.getInitialState()
);

export const getUsersLoading = (state: StateSchema) =>
  state.users.isLoading || false;

export const getUsersError = (state: StateSchema) => state.users.error || "";
