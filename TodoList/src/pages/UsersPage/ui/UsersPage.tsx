import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./UsersPage.module.scss";
import { UsersList } from "@/features/Users/ui/UsersList/UsersList";

interface UsersPageProps {
  someClasses?: string;
}

const UsersPage: FC<UsersPageProps> = ({ someClasses }) => {
  return (
    <div className={classNames(mainClasses.UsersPage, {}, [someClasses])}>
      <UsersList />
    </div>
  );
};

export default UsersPage;
