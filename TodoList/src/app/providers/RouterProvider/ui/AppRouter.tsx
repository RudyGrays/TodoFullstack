import {
  RouterConfig,
  TRouterConfig,
  TRoutes,
} from "@/app/providers/RouterProvider/config/RouterConfig";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Loader } from "@/shared/ui/Loader/Loader";
import { WithAuth } from "./ComponentWithAuth/WithAuth";
import { useSelector } from "react-redux";
import { getUserAuth } from "@/entities/User";

import { TasksPage } from "@/pages/TasksPage";
import { LoginPage } from "@/pages/LoginPage";

const AppRouter = () => {
  const isAuth = useSelector(getUserAuth);

  const resultConfig: TRouterConfig = {
    ...RouterConfig,
    [TRoutes.HOME]: {
      element: isAuth ? <TasksPage /> : <LoginPage />,
    },
  };

  return (
    <Suspense
      fallback={
        <div className="centerLoader">
          <Loader />
        </div>
      }
    >
      <Routes>
        {Object.values(resultConfig).map(({ element, path, withAuth }) => {
          if (withAuth)
            return (
              <Route
                key={path}
                element={<WithAuth isAuth={isAuth}>{element}</WithAuth>}
                path={path}
              />
            );
          if (!withAuth) {
            return <Route key={path} element={element} path={path} />;
          }
          return <Route key={path} element={element} path={path} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
