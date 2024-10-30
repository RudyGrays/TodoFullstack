import { TaskSchema } from "@/entities/Task";
import { UserSchema } from "@/entities/User";

import { SubordinateSchema } from "@/features/Subordinates";
import { UsersSchema } from "@/features/Users";
import { AxiosInstance } from "axios";

export interface StateSchema {
  user: UserSchema;
  task: TaskSchema;
  subordinates: SubordinateSchema;
  users: UsersSchema;
}

export interface ThunkExtraArg {
  api?: AxiosInstance;
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArg;
  rejectValue: T;
}
