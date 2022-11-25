import React from 'react';
import styled, {css, withTheme} from 'styled-components';
import {CURSOR, FLEX_CENTER} from '@/constants';
import Icon from './Icon';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  yes = 'yes',
  no = 'no',
}

interface IButton {
  name?: string;
  icon?: string;
  className: string;
  type: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonComp = (props: IButton) => {
  return (
    <div
      className={props.className}
      onClick={() => {
        if (props?.disabled) return;
        if (typeof props?.onClick === 'function') props.onClick();
      }}
    >
      <div
        className={`button_container ${props.type == ButtonType.primary ? '' : props.type} ${
          props?.disabled ? 'disabled' : ''
        }`}
      >
        {props?.name ? <div>{props.name}</div> : ''}
        {props?.icon ? (
          <div className="icon_wrapper">
            <Icon icon={props.icon} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export const Button = withTheme(
  styled(ButtonComp)(() => {
    return css`
      .button_container {
        display: flex;
        ${FLEX_CENTER};
        padding: 1rem 1.5rem;
        border-radius: 1.6rem;
        ${CURSOR};
        background-color: #fdeaf1;
        color: #f95997;
        font-size: 1.6rem;
        flex-direction: row;
        &:hover {
          transform: scale(1.1);
        }
      }

      .icon_wrapper {
        width: 1.6rem;
        height: 1.6rem;
        margin-left: 1rem;
      }

      .secondary {
        background-color: gray;
        color: black;
      }

      .disabled {
        cursor: not-allowed;
        opacity: 0.8;
        &:hover {
          transform: unset;
        }
      }
      .yes {
        //background-color: chartreuse;
        //color: white;
        border: 1px solid #888;
        background-color: transparent;
        color: unset;
      }
      .no {
        //background-color: darkred;
        //color: white;
        color: unset;
        border: 1px solid #888;
        background-color: transparent;
      }
    `;
  })
);
