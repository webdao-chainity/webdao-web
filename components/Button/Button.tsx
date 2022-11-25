import React, {cloneElement, ElementType, isValidElement} from 'react';
import StyledButton from './StyledButton';
import {ButtonProps, scales, variants} from './types';
// import getExternalLinkProps from '@/utils/getExternalLinkProps'
import clsx from 'clsx';

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const {startIcon, endIcon, external, className, isLoading, disabled, children, ...rest} = props;
  // const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  if (isLoading) {
    classNames.push('luxworld-button--loading');
  }

  if (isDisabled && !isLoading) {
    classNames.push('luxworld-button--disabled');
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={clsx(classNames.join(' '))}
      disabled={isDisabled}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: '0.5rem',
          } as any)}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: '0.5rem',
          } as any)}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
};

export default Button;
