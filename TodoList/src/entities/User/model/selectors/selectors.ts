import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { User } from "../types/UserSchema";

const getUserAuth = (state: StateSchema) => state.user.isAuth || false;
const getUserData = (state: StateSchema) => state.user.userData || ({} as User);
const getUserLoading = (state: StateSchema) => state.user.isLoading || false;
const getUserInit = (state: StateSchema) => state.user._init || false;
const getUserError = (state: StateSchema) => state.user.error || "";

export { getUserAuth, getUserData, getUserError, getUserInit, getUserLoading };
