import styled from 'styled-components';
import {space, typography, layout} from 'styled-system';
import {TextProps} from './types';
// import getThemeValue from '@/utils/getThemeValue'

// interface ThemedProps extends TextProps {
//   theme: DefaultTheme
// }

// const getColor = ({ color, theme }: ThemedProps) => {
const getColor = () => {
  // return getThemeValue(`colors.${color}`, color)(theme);
  return 'white';
};

const getFontSize = ({fontSize, small}: TextProps) => {
  return small ? '14px' : fontSize || '16px';
};

const Text = styled.div<TextProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  font-weight: ${({bold}) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${({textTransform}) => textTransform && `text-transform: ${textTransform};`}
  ${({ellipsis}) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}

  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: 'text',
  small: false,
  ellipsis: false,
};

export default Text;
