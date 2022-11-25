import {createGlobalStyle} from 'styled-components';

export const TABLET_WIDTH = 1024;
export const MOBILE_WIDTH = 640;

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    font-family: Montserrat, serif;
  }
`;

export const FLEX_ROW = `
    display: flex;
    flex-direction: row;
`;
export const FLEX_COLUMN = `
    display: flex;
    flex-direction: column;
`;

export const FLEX_CENTER = `
    align-items: center;
    justify-content: center;
`;

export const FLEX_ROW_BETWEEN = `
    ${FLEX_ROW}
    align-items: center;
    justify-content: space-between;
`;

export const CURSOR = `
    cursor: pointer;
    user-select: none;
`;

export const BASE_BUTTON = `
    ${CURSOR}
    border-radius: 0.8rem;
    display: flex;
    ${FLEX_CENTER}
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const IMAGE_IMG_TAG_STYLE = `
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
