import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { TasksPage } from "@/pages/TasksPage";
import { UsersPage } from "@/pages/UsersPage";
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
  forUnauthorized?: boolean;
}
export type TRouterConfig = Record<TRoutes, CustomRouteProps>;

export const RouterConfig: TRouterConfig = {
  [TRoutes.LOGIN]: {
    path: RoutePaths.login,
    element: <LoginPage />,
    forNavbar: false,
  },
  [TRoutes.HOME]: {
    path: RoutePaths.home,
    element: <HomePage />,
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
    forUnauthorized: true,
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
