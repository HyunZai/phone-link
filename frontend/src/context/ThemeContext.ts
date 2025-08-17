import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// context만 export
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
