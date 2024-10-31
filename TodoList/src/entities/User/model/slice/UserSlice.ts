import { createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/UserSchema";
import { RegisterThunk } from "@/features/Register";
import { LS_TOKEN } from "@/shared/constants/constants";
import { LoginThunk } from "@/features/Login";
import { RefreshTokenThunk } from "@/features/RefreshToken";
import { updateInstance } from "@/shared/api/axiosApiInstance";

export const resetHasToken = () => {
  return Boolean(localStorage.getItem(LS_TOKEN));
};

const initialState: UserSchema = {
  error: undefined,
  isAuth: resetHasToken(),
  isLoading: false,
  userData: undefined,
  _init: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LS_TOKEN);
      state.isLoading = false;
      state.userData = undefined;
      state._init = false;
      state.error = undefined;
      state.isAuth = resetHasToken();
    },
    resetError: (state) => {
      state.error = undefined;
    },
    setIsAuth: (state) => {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(RegisterThunk.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isAuth = true;
        state.error = undefined;
        state._init = true;
        state.isLoading = false;
        state.userData = user;
        localStorage.setItem(LS_TOKEN, JSON.stringify(token));
        updateInstance();
      })
      .addCase(RegisterThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //loginThunk
      .addCase(LoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isAuth = true;
        state.error = undefined;
        state._init = true;
        state.isLoading = false;
        state.userData = user;
        localStorage.setItem(LS_TOKEN, JSON.stringify(token));
        updateInstance();
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      //refresh-token
      .addCase(RefreshTokenThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(RefreshTokenThunk.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.isAuth = true;
        state.error = undefined;
        state._init = true;
        state.isLoading = false;
        state.userData = user;
        localStorage.setItem(LS_TOKEN, JSON.stringify(token));
      })
      .addCase(RefreshTokenThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;

        localStorage.removeItem(LS_TOKEN);
      });
  },
});

export const { reducer: UserReducer, actions: UserActions } = UserSlice;
