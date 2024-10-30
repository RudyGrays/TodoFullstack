import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";

import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";
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
>("RegisterThunk", async (props, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.post<UserDTO>("/auth/register", props);

    if (!response.data) {
      return rejectWithValue(response?.data?.error);
    }
    dispatch(useNotificationThunk(response.data.message));
    return response.data;
  } catch {
    return rejectWithValue("Ошибка с сервера");
  }
});
