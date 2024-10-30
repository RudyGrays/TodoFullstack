import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";
import { User } from "@/entities/User/model/types/UserSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSubordinatesThunk } from "../getSubordinates/getSubordinatesThunk";
import { getUsersThunk } from "@/features/Users";

import { useNotificationThunk } from "@/entities/Notification/model/services/useNotificationThunk/useNotificationThunk";
interface Props {
  message: string;
  users: User[];
}
export const addSubordinateThunk = createAsyncThunk<
  Props,
  string,
  ThunkConfig<string>
>("addSubordinateThunk", async (data, { extra, rejectWithValue, dispatch }) => {
  try {
    const response = await extra.api.post<Props>("/users/add/subordinate", {
      subordinateId: data,
    });
    dispatch(useNotificationThunk(response.data.message));
    dispatch(getSubordinatesThunk());
    dispatch(getUsersThunk());

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});
