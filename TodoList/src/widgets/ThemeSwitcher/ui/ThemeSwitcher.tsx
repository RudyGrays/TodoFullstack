import { FC } from "react";
import mainClasses from "./ThemeSwitcher.module.scss";
import { Button } from "antd";
import { useTheme } from "@/shared/hooks/useTheme";
import { AppThemes } from "@/app/providers/ThemeProvider/ui/ThemeProvider";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const ThemeSwitcher: FC = () => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <Button className={mainClasses.Switcher} onClick={toggleTheme}>
      {currentTheme === AppThemes.DARK ? <MoonOutlined /> : <SunOutlined />}
    </Button>
  );
};

export { ThemeSwitcher };
