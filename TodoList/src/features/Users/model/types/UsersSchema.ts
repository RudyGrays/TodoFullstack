import { User } from "@/entities/User";
type entityId = string;

export interface UsersSchema {
  ids: entityId[];
  entities: Record<entityId, User>;
  isLoading?: boolean;
  error?: string;
}
