import React, { useContext } from 'react';
import { GraphicsContext } from "./context/GraphicsContext";

export function ColorControls() {
  const { backgroundColor, textColor, innerColor, outerColor } = useContext(GraphicsContext)

  return (
    <section>
      <h1>Colors</h1>
      <label>BG
        <input type='text' {...backgroundColor} />
      </label>
      <br />
      <label>Text
        <input type='text' {...textColor} />
      </label>
      <br />
      <label>Inner Bar
        <input type='text' {...innerColor} />
      </label>
      <br />
      <label>Outer Bar
        <input type='text' {...outerColor} />
      </label>
    </section>
  )
}