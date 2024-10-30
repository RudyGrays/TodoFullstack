import { User } from "@/entities/User";

export const enum Priority {
  HIGH,
  MEDIUM,
  LOW,
}

export const enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
  status: Status;
  creatorId?: string;
  assigneeId?: string;
  assignee: User;
  creator: User;
}

export interface TaskProps
  extends Omit<
    Task,
    "id" | "createdAt" | "updatedAt" | "status" | "creatorId"
  > {
  title: string;
  priority: Priority;
  assigneeId?: string;
  description: string;
  dueDate: Date;
}

export interface TaskDTO {
  task?: Task;
  message?: string;
  error?: string;
}

export type TaskId = string;

export interface TaskSchema {
  isLoading?: boolean;
  error?: string;
  ids: TaskId[];
  entities: Record<TaskId, Task>;
}
