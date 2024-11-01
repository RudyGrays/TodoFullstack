import { RouterConfig } from "@/app/providers/RouterProvider/config/RouterConfig";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Loader } from "@/shared/ui/Loader/Loader";
import { WithAuth } from "./ComponentWithAuth/WithAuth";
import { useSelector } from "react-redux";
import { getUserAuth } from "@/entities/User";

const AppRouter = () => {
  const isAuth = useSelector(getUserAuth);

  return (
    <Suspense
      fallback={
        <div className="centerLoader">
          <Loader />
        </div>
      }
    >
      <Routes>
        {Object.values(RouterConfig).map(({ element, path, withAuth }) => {
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
