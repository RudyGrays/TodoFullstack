import { lazy } from "react";

export const LoginPageAsync = lazy(() => {
  return import("./LoginPage.tsx");
});
