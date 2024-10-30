import { lazy } from "react";

export const NotFoundPageAsync = lazy(() => {
  return import("./NotFoundPage.tsx");
});
