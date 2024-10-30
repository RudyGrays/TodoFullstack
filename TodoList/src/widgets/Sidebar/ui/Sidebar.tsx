import { FC } from "react";

import mainClasses from "./Sidebar.module.scss";
import classNames from "classnames";
import { RouterConfig } from "@/app/providers/RouterProvider/config/RouterConfig";
import { Link } from "@/shared/ui/Link/Link";
import { ThemeSwitcher } from "@/widgets/ThemeSwitcher";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { getUserAuth } from "@/entities/User";

interface SidebarProps {
  someClasses?: string;
}

const Sidebar: FC<SidebarProps> = ({ someClasses }) => {
  const isAuth = useSelector(getUserAuth);

  const routes = Object.values(RouterConfig).filter((route) => {
    return route.forNavbar !== false && route.withAuth === isAuth;
  });

  return (
    <aside className={classNames(mainClasses.Sidebar, {}, [someClasses])}>
      <Typography.Text className={mainClasses.title}>Menu</Typography.Text>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.path}>
              <Link to={route.path}>{route.navbarName}</Link>
            </li>
          );
        })}
      </ul>
      <span className={mainClasses.SwitcherWrapper}>
        <ThemeSwitcher />
      </span>
    </aside>
  );
};

export { Sidebar };
