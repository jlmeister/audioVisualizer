import React, { useContext } from 'react';
import { GraphicsContext } from "./context/GraphicsContext";

export function ScaleControls() {
  const { barHeightScale, barWidth, spacing, radius } = useContext(GraphicsContext)

  return (
    <section>
      <h1>Scale</h1>
      <label>Bar Height
        <input type='range' {...barHeightScale} min={0.1} max={3} step={0.1} />
      </label>
      <br />
      <label>Bar Width
        <input type='range' {...barWidth} min={1} max={20} />
      </label>
      <br />
      <label>Spacing
        <input type='range' {...spacing} min={0} max={10} />
      </label>
      <br />
      <label>Radius
        <input type='range' {...radius} min={10} max={250} />
      </label>
    </section>
  )
}