import React from 'react';
import { useLocalStorage } from './hooks';

export function ScaleControls() {
  const barHeightScale = useLocalStorage('bar-height-scale', 1)
  const barWidth = useLocalStorage('bar-width', 8)
  const spacing = useLocalStorage('spacing', 4)
  const radius = useLocalStorage('radius', 50)

  return (
    <section>
      <h1>Scale</h1>
      <label>Bar Height
        <input type='range' {...barHeightScale} min={0.1} max={3} step={0.1} />
      </label>
      <span>{barHeightScale.value}</span>
      <br />
      <label>Bar Width
        <input type='range' {...barWidth} min={1} max={20} />
      </label>
      <span>{barWidth.value}</span>
      <br />
      <label>Spacing
        <input type='range' {...spacing} min={0} max={10} />
      </label>
      <span>{spacing.value}</span>
      <br />
      <label>Radius
        <input type='range' {...radius} min={0} max={250} />
      </label>
      <span>{radius.value}</span>
    </section>
  )
}