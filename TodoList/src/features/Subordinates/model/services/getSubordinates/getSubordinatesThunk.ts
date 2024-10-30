import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";

import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";
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
>("getSubordinateThunk", async (_, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.get<Props>("/users/subordinates");
    dispatch(useNotificationThunk(response.data.message));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
