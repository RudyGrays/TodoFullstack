import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./LoginPage.module.scss";
import { LoginForm } from "@/features/Login";

interface LoginPageProps {
  someClasses?: string;
}

const LoginPage: FC<LoginPageProps> = ({ someClasses }) => {
  return (
    <div className={classNames(mainClasses.LoginPage, {}, [someClasses])}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
