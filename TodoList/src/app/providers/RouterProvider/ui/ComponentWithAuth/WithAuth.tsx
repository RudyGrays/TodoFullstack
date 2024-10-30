import { FC, ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../config/RouterConfig";

interface WithAuthProps {
  children: ReactNode;
  isAuth: boolean;
}

const WithAuth: FC<WithAuthProps> = ({ children, isAuth }) => {
  if (isAuth) {
    return children;
  } else {
    return <Navigate to={RoutePaths.login} />;
  }
};

export { WithAuth };
