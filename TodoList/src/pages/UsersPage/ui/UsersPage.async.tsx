import { lazy } from "react";

export const UsersPageAsync = lazy(() => {
  return import("./UsersPage.tsx");
});
