import { useContext } from "react";
import { ThemeContext } from "../../app/providers/ThemeProvider/ui/ThemeProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};
