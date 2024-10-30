import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { UserReducer } from "@/entities/User";
import { $api } from "@/shared/api/axiosApiInstance";
import { useDispatch } from "react-redux";
import { TaskReducer } from "@/entities/Task";
import { SubordinatesReducer } from "@/features/Subordinates";
import { UsersReducer } from "@/features/Users";
import { notificationReducer } from "@/entities/Notification";

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: UserReducer,
    task: TaskReducer,
    subordinates: SubordinatesReducer,
    users: UsersReducer,
    notification: notificationReducer,
  };

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
    preloadedState: initialState,
  });
};

export type AppStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
