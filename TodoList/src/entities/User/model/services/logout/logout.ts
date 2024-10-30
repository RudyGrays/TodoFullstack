import { SubordinatesActions } from "@/features/Subordinates";
import { UsersActions } from "@/features/Users";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserActions } from "../../slice/UserSlice";
import { TaskActions } from "@/entities/Task";
import { notificationActions } from "@/entities/Notification";

export const logout = createAsyncThunk("logout", (_, { dispatch }) => {
  dispatch(SubordinatesActions.initialState());
  dispatch(UsersActions.initialState());
  dispatch(UserActions.logout());
  dispatch(TaskActions.initialState());
  dispatch(notificationActions.setNotification("Выход выполнен!"));
});
