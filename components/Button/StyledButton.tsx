import styled, {DefaultTheme} from 'styled-components';
import {space, layout, variant} from 'styled-system';
import {scaleVariants, styleVariants} from './theme';
import {BaseButtonProps} from './types';

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean;
}

const getDisabledStyles = ({$isLoading}: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.luxworld-button--disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled,
    &.luxworld-button--disabled {
      background-color: #d6d6d6;
      border-color: #d6d6d6;
      box-shadow: none;
      color: #d6d6d6;
      // opacity: 0.4;
      cursor: not-allowed;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({$isLoading = false}: TransientButtonProps) => {
  return $isLoading ? '.5' : '1';
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  //border-radius: 16px;
  border-radius: 4px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.luxworld-button--disabled):not(.luxworld-button--disabled):not(
      :active
    ) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.luxworld-button--disabled):not(.luxworld-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: 'scale',
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
`;

export default StyledButton;
