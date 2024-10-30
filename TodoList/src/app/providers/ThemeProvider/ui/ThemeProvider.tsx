import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { THEME_LS_KEY } from "../../../../shared/constants/constants";

export const enum AppThemes {
  DARK = "dark",
  LIGHT = "light",
}
export interface ThemeContextProps {
  toggleTheme?: () => void;
  currentTheme?: AppThemes;
  setDefiniteTheme?: (theme: AppThemes) => void;
}
export const ThemeContext = createContext<ThemeContextProps>({});

interface ThemeProviderProps {
  children: ReactNode;
  value?: ThemeContextProps;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setTheme] = useState<AppThemes>(AppThemes.LIGHT);

  const setDefiniteTheme = useCallback(
    (theme: AppThemes) => {
      setTheme(theme);
    },
    [setTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme =
        prev === AppThemes.DARK ? AppThemes.LIGHT : AppThemes.DARK;
      localStorage.setItem(THEME_LS_KEY, JSON.stringify(nextTheme));
      return nextTheme;
    });
  }, [setTheme]);

  const memoizedValue = useMemo(() => {
    return {
      toggleTheme,
      currentTheme,
      setDefiniteTheme,
    };
  }, [toggleTheme, currentTheme, setDefiniteTheme]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
};
