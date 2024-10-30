import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  someClasses?: string;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ someClasses, ...props }) => {
  return (
    <div
      className={classNames(mainClasses.NotFoundPage, {}, [someClasses])}
      {...props}
    >
      NotFoundPage
    </div>
  );
};

export default NotFoundPage;
