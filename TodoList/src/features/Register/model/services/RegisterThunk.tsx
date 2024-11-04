import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";

import { UserDTO } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface RegisterThunkProps {
  login: string;
  password: string;
  firstname: string;
  lastname: string;
  patronymic: string;
}

export const RegisterThunk = createAsyncThunk<
  UserDTO,
  RegisterThunkProps,
  ThunkConfig<string>
>("RegisterThunk", async (props, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.post<UserDTO>("/auth/register", props);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
