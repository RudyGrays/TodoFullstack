import classNames from "classnames";
import { useTheme } from "../shared/hooks/useTheme";
import { useEffect, useLayoutEffect } from "react";
import { AppThemes } from "./providers/ThemeProvider/ui/ThemeProvider";
import { THEME_LS_KEY } from "../shared/constants/constants";

import { Header } from "../widgets/Header";
import { Content } from "@/widgets/Content";
import styled from "styled-components";
import { Sidebar } from "@/widgets/Sidebar";
import { useAppDispatch } from "./providers/StoreProvider/config/store";
import { RefreshTokenThunk } from "@/features/RefreshToken";
import { useSelector } from "react-redux";
import { getUserAuth } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "./providers/RouterProvider/config/RouterConfig";

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
  const isAuth = useSelector(getUserAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) navigate(RoutePaths.tasks);
  }, [isAuth]);

  useLayoutEffect(() => {
    const theme = JSON.parse(localStorage.getItem(THEME_LS_KEY)) as AppThemes;
    if (theme) {
      setDefiniteTheme(theme);
    }
    dispatch(RefreshTokenThunk());
  }, [setDefiniteTheme, dispatch]);

  return (
    <div className={classNames(`app`, [currentTheme])}>
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
