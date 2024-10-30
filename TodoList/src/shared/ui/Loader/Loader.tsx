import { FC } from "react";
import classNames from "classnames";
import mainClasses from "./Loader.module.scss";

interface LoaderProps {
  someClasses?: string;
}

const Loader: FC<LoaderProps> = ({ someClasses }) => {
  return (
    <div className={classNames(mainClasses["lds-roller"], {}, [someClasses])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { Loader };
