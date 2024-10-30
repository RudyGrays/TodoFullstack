import { Popover as AntPopover, PopoverProps } from "antd";

import { FC, ReactNode } from "react";
interface IPopoverProps extends PopoverProps {
  children: ReactNode;
}
const Popover: FC<IPopoverProps> = ({ children, ...props }) => {
  return <AntPopover {...props}>{children} </AntPopover>;
};

export { Popover };
