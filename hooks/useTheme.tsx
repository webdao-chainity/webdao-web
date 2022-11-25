import {useEffect, useState} from 'react';
import {getTheme, isValidThemeName, THEME_LOCAL_STORAGE_KEY, THEMES_NAME} from '@/themes';

const useTheme = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setThemeName(localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || THEMES_NAME.LIGHT);
  }, []);

  const [themeName, setThemeName] = useState<string>(THEMES_NAME.LIGHT);
  const themeData = getTheme(themeName);

  const setTheme = (themeNameValue: string) => {
    if (!isValidThemeName(themeNameValue)) return;
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeNameValue);
    setThemeName(themeNameValue);
  };

  return mounted
    ? {themeName, themeData, setTheme}
    : {themeName: THEMES_NAME.LIGHT, themeData, setTheme};
};

export default useTheme;
