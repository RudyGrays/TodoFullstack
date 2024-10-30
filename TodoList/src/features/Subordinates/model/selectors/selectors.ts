import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { SubordinateAdapter } from "../slice/SubordinatesSlice";

export const getSubordinateSelectors =
  SubordinateAdapter.getSelectors<StateSchema>(
    (state) => state.subordinates || SubordinateAdapter.getInitialState()
  );

export const getSubordinateError = (state: StateSchema) =>
  state.subordinates.error || "";
export const getSubordinateLoading = (state: StateSchema) =>
  state.subordinates.isLoading || false;
