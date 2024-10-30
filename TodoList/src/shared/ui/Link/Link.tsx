import { FC, ReactNode } from "react";
import classNames from "classnames";
import mainClasses from "./Link.module.scss";
import { NavLink, To } from "react-router-dom";

interface LinkProps {
  someClasses?: string;
  to: To;
  children: ReactNode;
}

const Link: FC<LinkProps> = ({ to, children, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(mainClasses.Link, { [mainClasses.active]: isActive })
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export { Link };
