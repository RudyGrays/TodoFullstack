import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getNotification = (state: StateSchema) =>
  state.notification.message || "";
