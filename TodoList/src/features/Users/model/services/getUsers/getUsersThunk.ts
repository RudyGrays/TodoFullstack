import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { User } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface Response {
  message: string;
  users: User[];
}
export const getUsersThunk = createAsyncThunk<
  Response,
  undefined,
  ThunkConfig<string>
>("getUsersThunk", async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<Response>("/users/all");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
