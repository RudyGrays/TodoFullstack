import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./Content.module.scss";
import AppRouter from "@/app/providers/RouterProvider/ui/AppRouter";

interface ContentProps {
  someClasses?: string;
}

const Content: FC<ContentProps> = ({ someClasses, ...props }) => {
  return (
    <main
      className={classNames(mainClasses.Content, {}, [someClasses])}
      {...props}
    >
      <AppRouter />
    </main>
  );
};

export { Content };
