import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSubordinatesThunk } from "../getSubordinates/getSubordinatesThunk";
import { getUsersThunk } from "@/features/Users";
interface Props {
  message: string;
}
export const removeSubordinateThunk = createAsyncThunk<
  Props,
  string,
  ThunkConfig<string>
>(
  "removeSubordinateThunk",
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<Props>(
        "/users/remove/subordinate",
        {
          subordinateId: data,
        }
      );
      dispatch(getSubordinatesThunk());
      dispatch(getUsersThunk());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
