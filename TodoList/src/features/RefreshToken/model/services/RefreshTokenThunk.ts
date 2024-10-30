import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { UserDTO } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const RefreshTokenThunk = createAsyncThunk<
  UserDTO,
  undefined,
  ThunkConfig<string>
>("RefreshTokenThunk", async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<UserDTO>("/auth/refresh-token");

    return response.data;
  } catch {
    return rejectWithValue("Нужно войти в аккаунт");
  }
});
