import {
  RoutePaths,
  RouterConfig,
  TRoutes,
  TRouterConfig,
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

  const configWithValidHome: Partial<TRouterConfig> = {
    ...RouterConfig,
    [TRoutes.HOME]: {
      element: isAuth ? <TasksPage /> : <LoginPage />,
      forNavbar: false,
      path: RoutePaths.home,
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
        {Object.values(configWithValidHome).map(
          ({ element, path, withAuth, forUnauthorized }) => {
            if (withAuth)
              return (
                <Route
                  key={path}
                  element={<WithAuth isAuth={isAuth}>{element}</WithAuth>}
                  path={path}
                />
              );
            if (forUnauthorized) {
              return <Route key={path} element={element} path={path} />;
            }
            return <Route key={path} element={element} path={path} />;
          }
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
