import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";

import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";
import { UserDTO } from "@/entities/User/model/types/UserSchema";

import { createAsyncThunk } from "@reduxjs/toolkit";

export interface LoginThunkProps {
  login: string;
  password: string;
}

export const LoginThunk = createAsyncThunk<
  UserDTO,
  LoginThunkProps,
  ThunkConfig<string>
>("LoginThunk", async (props, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.post<UserDTO>("/auth/login", props);
    dispatch(useNotificationThunk(response.data.message));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
