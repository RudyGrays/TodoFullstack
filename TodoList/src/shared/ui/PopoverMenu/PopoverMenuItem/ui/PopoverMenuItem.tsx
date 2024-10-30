import { FC, ReactNode } from "react";
import styled from "styled-components";

const SPopoverMenuItem = styled.div`
  width: 100%;
  padding: 3px;
`;

interface PopoverMenuItemProps {
  someClasses?: string;
  children: ReactNode | string;
}

const PopoverMenuItem: FC<PopoverMenuItemProps> = ({ children }) => {
  return <SPopoverMenuItem>{children}</SPopoverMenuItem>;
};

export { PopoverMenuItem };
