import styled, {css, keyframes} from 'styled-components';
import React, {FC, useEffect} from 'react';
import {Box, BoxProps} from '../Box';

const unmountAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const mountAnimation = keyframes`
  0% {
   opacity: 0;
  }
  100% {
   opacity: 1;
  }
`;

const StyledOverlay = styled(Box)<{isUnmounting?: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 20;
  will-change: opacity;
  animation: ${mountAnimation} 350ms ease forwards;
  ${({isUnmounting}) =>
    isUnmounting &&
    css`
      animation: ${unmountAnimation} 350ms ease forwards;
    `}
`;

const BodyLock = () => {
  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
    `;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.cssText = `
        overflow: visible;
        overflow: overlay;
      `;
    };
  }, []);

  return null;
};

interface OverlayProps extends BoxProps {
  isUnmounting?: boolean;
}

export const Overlay: FC<OverlayProps> = (props) => {
  return (
    <>
      <BodyLock />
      <StyledOverlay role="presentation" {...props} />
    </>
  );
};

export default Overlay;
