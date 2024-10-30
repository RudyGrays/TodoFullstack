import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./RegisterPage.module.scss";
import { RegisterForm } from "@/features/Register";

interface RegisterPageProps {
  someClasses?: string;
}

const RegisterPage: FC<RegisterPageProps> = ({ someClasses }) => {
  return (
    <div className={classNames(mainClasses.RegisterPage, {}, [someClasses])}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
