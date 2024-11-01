import classNames from "classnames";
import { useTheme } from "../shared/hooks/useTheme";
import { useLayoutEffect } from "react";
import { AppThemes } from "./providers/ThemeProvider/ui/ThemeProvider";
import { LS_TOKEN, THEME_LS_KEY } from "../shared/constants/constants";

import { Header } from "../widgets/Header";
import { Content } from "@/widgets/Content";
import styled from "styled-components";
import { Sidebar } from "@/widgets/Sidebar";
import { useAppDispatch } from "./providers/StoreProvider/config/store";
import { RefreshTokenThunk } from "@/features/RefreshToken";

import Notification from "@/entities/Notification/ui/Notification/Notification";

const ContentWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  max-width: 200px;
`;

function App() {
  const { currentTheme, setDefiniteTheme } = useTheme();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const theme = JSON.parse(localStorage.getItem(THEME_LS_KEY)) as AppThemes;
    if (theme) {
      setDefiniteTheme(theme);
    }
    if (localStorage.getItem(LS_TOKEN)) {
      dispatch(RefreshTokenThunk());
    }
  }, [setDefiniteTheme, dispatch]);

  return (
    <div className={classNames(`app`, [currentTheme])}>
      <Notification />
      <Header />
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <Content />
      </ContentWrapper>
    </div>
  );
}

export default App;
