import React, { useContext } from 'react';
import { GraphicsContext } from "./context/GraphicsContext";

export function TransformControls() {
  const { startAngle, resolution } = useContext(GraphicsContext)

  return (
    <section>
      <h1>Other</h1>
      <label>Rotate
        <input type='range' {...startAngle} min={0} max={359} />
      </label>
      <br />
      <label>Number of Bars
        <select {...resolution}>
          <option>16</option>
          <option>32</option>
          <option>64</option>
          <option>128</option>
          <option>256</option>
          <option>512</option>
          <option>1024</option>
          <option>2048</option>
          <option>4096</option>
        </select>
      </label>
    </section>
  )
}