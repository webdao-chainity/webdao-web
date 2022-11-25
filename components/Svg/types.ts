import { SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from 'styled-system'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme
  spin?: boolean
  ml?: string
}

export type IconComponentType = {
  icon: any
  fillIcon?: any
  isActive?: boolean
  height?: string
  width?: string
  activeColor?: string
  // activeBackgroundColor?: keyof Colors
} & SvgProps
