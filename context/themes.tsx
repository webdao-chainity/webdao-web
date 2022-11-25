import {createContext} from 'react';

export interface IThemeContext {
  themeName: string;
  themeData: object;
  setTheme: (arg0: string) => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
