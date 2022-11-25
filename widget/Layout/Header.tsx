import React, {memo} from 'react'
import styled, {css, withTheme} from "styled-components";
import {Button, ButtonType} from "components";
import {CURSOR, FLEX_ROW_BETWEEN} from '@/constants';
import _ from "lodash";
import {ThemeSwitcher} from "./ThemeSwitcher";
import {useWalletModal} from "@/components/WalletModal";
import useAuth from "../../hooks/useAuth";
import logo from 'public/WebDAO-logo.png';
import ROUTES from "@/constants/route";
import {useRouter} from "next/router";

interface IHeader {
    className: string;
    theme: string;
}

const HeaderComp = (props: IHeader) => {
    const {login, logout, account} = useAuth();
    console.log(account)
    const {onPresentConnectModal} = useWalletModal(login);
    const router = useRouter();

    return <div className={props.className}>
        <div className="header_container">
            <div className="left_section">
                <a className="log_container" href={ROUTES.HOME_PATH}>
                    <img src={logo.src} alt="logo"/>
                </a>
                <div className="site_name">WebDAO</div>
            </div>
            <div className="right_section">
                <ThemeSwitcher/>
                <Button name='Add event' type={ButtonType.secondary} onClick={() => {
                    console.log(ROUTES.ADD_EVENT_PATH)
                    router.push(ROUTES.ADD_EVENT_PATH)
                }
                }/>
                <Button name={account ? 'Disconnect wallet' : 'Connect wallet'} type={ButtonType.primary}
                        onClick={() => {
                            if (account) {
                                logout();
                                return
                            }
                            onPresentConnectModal();
                        }}/>
            </div>
        </div>
    </div>
}


const HeaderStyled = withTheme(styled(HeaderComp)((props: IHeader) => {
    return css`
      .header_container {
        padding: 1rem;
        ${FLEX_ROW_BETWEEN};
        background-color: ${_.get(props, 'theme.header_background', 'white')};
        border-bottom: 1px solid ${_.get(props, 'theme.header_border_bottom_color', 'white')};

        .left_section {
          ${FLEX_ROW_BETWEEN};

          .log_container {
            ${CURSOR};
            border-radius: 0.2rem;
            padding: 0.5rem;
            width: 7.4rem;
            height: 5rem;
            overflow: hidden;
            background-color: gray;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            margin-right: 5rem;
          }

          .site_name {
            font-size: 2rem;
            font-weight: bold;
            //letter-spacing: .4rem;
          }
        }

        .right_section {
          display: flex;
          column-gap: 1rem;
        }

      }
    `
}))

export const Header = memo(HeaderStyled)