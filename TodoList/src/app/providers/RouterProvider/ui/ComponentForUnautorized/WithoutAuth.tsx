import { FC, ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../config/RouterConfig";

interface WithoutAuthProps {
  children: ReactNode;
  isAuth: boolean;
}

const WithoutAuth: FC<WithoutAuthProps> = ({ children, isAuth }) => {
  if (isAuth) {
    return children;
  } else {
    return <Navigate to={RoutePaths.login} />;
  }
};

export { WithoutAuth };
