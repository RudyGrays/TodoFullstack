import { lazy } from "react";

export const RegisterPageAsync = lazy(() => {
  return import("./RegisterPage.tsx");
});
