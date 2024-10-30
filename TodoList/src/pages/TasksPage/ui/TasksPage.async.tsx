import { lazy } from "react";

export const TasksPageAsync = lazy(() => {
  return import("./TasksPage.tsx");
});
