import dark from './source/dark.json';
import light from './source/light.json';

export const THEME_LOCAL_STORAGE_KEY = 'sys_theme';

export const THEMES_NAME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const THEME_DATA = {
  [THEMES_NAME.LIGHT]: light,
  [THEMES_NAME.DARK]: dark,
};

export const getTheme = (themeName: string | null | undefined) => {
  let themeNameConverted: any = themeName;
  if (!isValidThemeName(themeName)) themeNameConverted = THEMES_NAME.LIGHT;
  return THEME_DATA[themeNameConverted];
};

export const isValidThemeName = (themeName: string | null | undefined) => {
  if (themeName == null) return;
  return Object.values(THEMES_NAME).includes(themeName);
};
