import { FC, ReactNode } from "react";

import styled from "styled-components";

const SPopoverMenu = styled.menu`
  display: flex;
  flex-direction: column;
`;
interface PopoverMenuProps {
  children: ReactNode;
}
const PopoverMenu: FC<PopoverMenuProps> = ({ children }) => {
  return <SPopoverMenu>{children}</SPopoverMenu>;
};

export { PopoverMenu };
