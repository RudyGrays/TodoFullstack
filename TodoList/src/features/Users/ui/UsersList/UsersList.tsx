import { FC, useEffect } from "react";

import { List, Typography } from "antd";

import {
  getUsersLoading,
  getUsersSelectors,
} from "../../model/selectors/selectors";
import { useSelector } from "react-redux";
import { UserCard } from "../UserCard/UserCard";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { getUsersThunk } from "../../model/services/getUsers/getUsersThunk";
import { Loader } from "@/shared/ui/Loader/Loader";
import style from "./style.module.scss";

interface UsersListProps {
  someClasses?: string;
}

const UsersList: FC<UsersListProps> = () => {
  const users = useSelector(getUsersSelectors.selectAll);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getUsersLoading);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="centerLoader">
        <Loader />
      </div>
    );

  return (
    <div className={style.main}>
      <Typography.Text className={style.list}>
        Список пользователей
      </Typography.Text>
      <List
        size="small"
        dataSource={users}
        renderItem={(user) => <UserCard user={user} />}
      />
    </div>
  );
};

export { UsersList };
