export { UserActions, UserReducer, UserSlice } from "./model/slice/UserSlice";
export type { UserSchema, User } from "./model/types/UserSchema";

export {
  getUserAuth,
  getUserData,
  getUserError,
  getUserInit,
  getUserLoading,
} from "./model/selectors/selectors";

export { logout } from "./model/services/logout/logout";
