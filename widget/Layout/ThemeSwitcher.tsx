import React, {useContext} from 'react';
import styled, {css, withTheme} from "styled-components";
import Icon from "@/components/Icon";
import {THEMES_NAME} from "@/themes";
import {FLEX_ROW_BETWEEN} from "@/constants";
import {ThemeContext} from "context/themes";
import clsx from "clsx";

interface ITheme {
    className: string;
}

const ThemeSwitcherComp = (props: ITheme) => {
    const languageContext = useContext(ThemeContext)
    const handleChangeTheme = (themeNameValue: string) => {
        if (themeNameValue == languageContext?.themeName) return
        languageContext?.setTheme(themeNameValue)
    }

    return <div className={props.className}>
        <div className="theme_switcher_wrapper">
            <div className={clsx("theme_icon", languageContext?.themeName === THEMES_NAME.LIGHT ? 'active' : '')}
                 onClick={() => handleChangeTheme(THEMES_NAME.LIGHT)}>
                <Icon icon='sun2'/>
            </div>
            /
            <div className={clsx("theme_icon", languageContext?.themeName === THEMES_NAME.DARK ? 'active' : '')}
                onClick={() => handleChangeTheme(THEMES_NAME.DARK)}>
                <Icon icon='moon2'/>
            </div>
        </div>
    </div>
}

export const ThemeSwitcher = withTheme(styled(ThemeSwitcherComp)(() => {
    return css`
      height: inherit;

      .theme_switcher_wrapper {
        height: 100%;
        ${FLEX_ROW_BETWEEN};
        column-gap: .5rem;

        .theme_icon {
          width: 1.6rem;
          height: 1.6rem;
          color: #888;

          &:hover {
            color: #f95192;
          }
        }
        .active{
          color: #f95192;
        }
      }
    `
}))