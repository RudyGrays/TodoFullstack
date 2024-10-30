import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
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
>("LoginThunk", async (props, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.post<UserDTO>("/auth/login", props);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
