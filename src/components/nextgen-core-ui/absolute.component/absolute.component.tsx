import React from "react"

import type { IBaseComponentProps } from "../types"

interface IAbsoluteProps extends IBaseComponentProps {
  style?: React.CSSProperties
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  xCenter?: boolean
  yCenter?: boolean
}

/**
 * Absolute component - A div with CSS `position: absolute` property.
 *
 * It is ideal to use this component when you want to position an element relative to its nearest positioned ancestor.
 *
 * @param {IAbsoluteProps} props - The component properties
 * @returns {ReactElement} A div with absolute position
 */

const Absolute: React.FC<IAbsoluteProps> = ({
  children,
  className = "",
  style,
  top = false,
  bottom = false,
  left = false,
  right = false,
  xCenter = false,
  yCenter = false,
  ...rest
}) => {
  let positionClasses = ""

  // X-axis positioning
  if (left) {
    positionClasses += "left-0 "
  } else if (right) {
    positionClasses += "right-0 "
  } else if (xCenter) {
    positionClasses += "left-1/2 transform -translate-x-1/2 "
  } else {
    positionClasses += "left-0 " // default
  }

  // Y-axis positioning
  if (top) {
    positionClasses += "top-0 "
  } else if (bottom) {
    positionClasses += "bottom-0 "
  } else if (yCenter) {
    positionClasses += "top-1/2 transform -translate-y-1/2 "
  } else {
    positionClasses += "top-0 " // default
  }

  return (
    <div
      className={`absolute ${positionClasses}${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Absolute
