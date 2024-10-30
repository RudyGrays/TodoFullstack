import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { User } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface Props {
  message: string;
  users: User[];
}
export const getSubordinatesThunk = createAsyncThunk<
  Props,
  undefined,
  ThunkConfig<string>
>("getSubordinateThunk", async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<Props>("/users/subordinates");

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
