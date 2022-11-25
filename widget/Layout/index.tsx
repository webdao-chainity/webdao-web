import React, {ReactNode} from 'react'
import {NextProgressBar} from 'components'
import {Header} from "./Header";
import {GlobalStyle} from "@/constants";
import styled, {ThemeProvider, withTheme, css} from "styled-components";
import _ from 'lodash';
import useTheme from 'hooks/useTheme';
import {ThemeContext} from "context/themes";
import {ModalProvider} from '@/components/Modal'
import {Web3ReactProvider} from '@web3-react/core'
import {getLibrary} from '@/engine/config'
import useEagerConnect from "@/hooks/useEagerConnect";

interface ILayout {
    className: string;
    children: ReactNode;
    theme: object;
}



function GlobalHooks() {
    useEagerConnect()
    return null
}

const LayoutBodyComp = (props: ILayout) => {
    return <div className={props.className}>
        <div className="layout_container">
            <div className="header_wrapper"><Header/></div>
            <div className="children_wrapper">
                {props.children}
            </div>
        </div>
    </div>
}

const LayoutBody = withTheme(styled(LayoutBodyComp)((props: ILayout) => {
    return css`
      background-color: ${_.get(props, 'theme.background_color')} !important;
      color: ${_.get(props, 'theme.color')} !important;

      .layout_container {
        position: relative;
        min-height: 100vh;
      }

      .header_wrapper {
        position: sticky;
        top: 0;
        z-index: 9999999999;
      }

      .children_wrapper {
        padding: 5rem 20rem;
      }
    `
}));

export const Layout = (props: { children: ReactNode }) => {
    const {themeName, themeData, setTheme} = useTheme()
    return <div>
        <Web3ReactProvider getLibrary={getLibrary}>
            <ThemeContext.Provider value={{themeName, themeData, setTheme}}>
                <ModalProvider>
                    <ThemeProvider theme={themeData}>
                        <GlobalStyle/>
                        <LayoutBody>
                            <GlobalHooks />
                            {props.children}
                        </LayoutBody>
                        <NextProgressBar/>
                    </ThemeProvider>
                </ModalProvider>
            </ThemeContext.Provider>
        </Web3ReactProvider>
    </div>
}

