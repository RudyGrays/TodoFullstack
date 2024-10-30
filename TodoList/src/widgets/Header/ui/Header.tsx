import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./Header.module.scss";

import { RoutePaths } from "@/app/providers/RouterProvider/config/RouterConfig";
import { Button, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuth, getUserData, logout } from "@/entities/User";
import { Popover } from "@/shared/ui/Popover/ui/Popover";
import { PopoverMenuItem } from "@/shared/ui/PopoverMenu/PopoverMenuItem/ui/PopoverMenuItem";
import { PopoverMenu } from "@/shared/ui/PopoverMenu/ui/PopoverMenu";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";

interface HeaderProps {
  someClasses?: string;
}

const Header: FC<HeaderProps> = ({ someClasses }) => {
  const isAuth = useSelector(getUserAuth);
  const userData = useSelector(getUserData);
  const dispatch = useAppDispatch();

  const PopoverContent = (
    <PopoverMenu>
      <PopoverMenuItem>
        <Typography.Text>{userData.login}</Typography.Text>
      </PopoverMenuItem>

      <PopoverMenuItem>
        <Button onClick={() => dispatch(logout())}>Выйти</Button>
      </PopoverMenuItem>
    </PopoverMenu>
  );

  return (
    <header className={classNames(mainClasses.Header, {}, [someClasses])}>
      <div className={mainClasses.left}>
        <Typography.Text>
          <span className={mainClasses.Title}>Todo List</span>
        </Typography.Text>
      </div>
      <div className={mainClasses.right}>
        <Typography.Link>
          {!isAuth && <NavLink to={RoutePaths.login}>Вход</NavLink>}
        </Typography.Link>
        {isAuth && (
          <Popover
            placement="leftBottom"
            content={PopoverContent}
            title="Профиль"
            trigger="click"
          >
            <UserOutlined style={{ cursor: "pointer", fontSize: 25 }} />
          </Popover>
        )}
      </div>
    </header>
  );
};

export { Header };
