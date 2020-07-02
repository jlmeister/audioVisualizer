import React, { createContext } from 'react';
import { useCssCustomProperty, useFormInput } from "../hooks";

export const GraphicsContext = createContext()

export const GraphicsContextProvider = ({ children }) => {
  const backgroundColor = useCssCustomProperty('--bg-color')
  const textColor = useCssCustomProperty('--text-color', '#000000')
  const innerColor = useCssCustomProperty('--inner-color', '#00aaee')
  const outerColor = useCssCustomProperty('--outer-color', '#ee00cc')
  const barHeightScale = useFormInput(1)
  const barWidth = useFormInput(8)
  const spacing = useFormInput(4)
  const resolution = useFormInput(64) // only powers of 2
  const radius = useFormInput(50)
  const startAngle = useFormInput(0)

  return (
    <GraphicsContext.Provider value={{ backgroundColor, textColor, innerColor, outerColor, barHeightScale, barWidth, spacing, resolution, radius, startAngle }} >
      {children}
    </GraphicsContext.Provider>
  )
}