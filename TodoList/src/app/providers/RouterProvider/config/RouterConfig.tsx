import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { TasksPage } from "@/pages/TasksPage";
import { UsersPage } from "@/pages/UsersPage";
import { LS_TOKEN } from "@/shared/constants/constants";
import { ReactNode } from "react";
import { PathRouteProps } from "react-router-dom";

export const enum TRoutes {
  TASKS = "tasks",
  LOGIN = "login",
  REGISTRATION = "register",
  NOT_FOUND = "not_found",
  HOME = "home",
  USERS = "users",
}

export const RoutePaths: Record<TRoutes, string> = {
  [TRoutes.LOGIN]: "/login",
  [TRoutes.REGISTRATION]: "/register",
  [TRoutes.TASKS]: "/tasks",
  [TRoutes.USERS]: "/users",
  [TRoutes.HOME]: "/",
  [TRoutes.NOT_FOUND]: "*",
};

interface CustomRouteProps extends PathRouteProps {
  icon?: string;
  element: ReactNode;
  withAuth?: boolean;
  forNavbar?: boolean;
  navbarName?: string;
}
export type TRouterConfig = Record<TRoutes, CustomRouteProps>;

const isAuth = localStorage.getItem(LS_TOKEN);

export const RouterConfig: TRouterConfig = {
  [TRoutes.LOGIN]: {
    path: RoutePaths.login,
    element: <LoginPage />,
    forNavbar: false,
  },
  [TRoutes.HOME]: {
    path: RoutePaths.home,
    element: isAuth ? <TasksPage /> : <LoginPage />,
    forNavbar: false,
  },
  [TRoutes.USERS]: {
    path: RoutePaths.users,
    element: <UsersPage />,
    forNavbar: true,
    withAuth: true,
    navbarName: "Users",
  },
  [TRoutes.REGISTRATION]: {
    path: RoutePaths.register,
    element: <RegisterPage />,
    forNavbar: false,
  },
  [TRoutes.TASKS]: {
    path: RoutePaths.tasks,
    element: <TasksPage />,
    withAuth: true,
    navbarName: "Tasks",
  },
  [TRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
    forNavbar: false,
  },
};
