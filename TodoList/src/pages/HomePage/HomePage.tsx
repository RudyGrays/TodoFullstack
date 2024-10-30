import { RoutePaths } from "@/app/providers/RouterProvider/config/RouterConfig";
import { getUserAuth } from "@/entities/User";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const isAuth = useSelector(getUserAuth);

  if (!isAuth) return <Navigate to={RoutePaths.login} />;

  return <Navigate to={RoutePaths.tasks} />;
};

export { HomePage };
