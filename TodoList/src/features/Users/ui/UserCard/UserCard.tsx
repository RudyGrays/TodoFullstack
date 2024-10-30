import { FC } from "react";

import { Button, List, Typography } from "antd";
import { User } from "@/entities/User";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { addSubordinateThunk } from "@/features/Subordinates/model/services/addSubordinate/addSubordinateThunk";
import { removeSubordinateThunk } from "@/features/Subordinates/model/services/removeSubordinate/removeSubordinateThunk";
import style from "./style.module.scss";

interface UserCardProps {
  user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <List.Item className={style.wrapper}>
      <Typography.Paragraph className={style.item}>
        Login: {user.login}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        FirstName: {user.firstName}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        LastName: {user.lastName}
      </Typography.Paragraph>
      {!user.imLeader ? (
        <Button onClick={() => dispatch(addSubordinateThunk(user.id))}>
          Сделать подчиненным
        </Button>
      ) : (
        <Button onClick={() => dispatch(removeSubordinateThunk(user.id))}>
          Отмена
        </Button>
      )}
    </List.Item>
  );
};

export { UserCard };
