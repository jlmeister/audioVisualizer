import React from 'react';
import { useCssCustomProperty, useLocalStorage } from './hooks';

export function ColorControls() {
  const backgroundColor = useCssCustomProperty('--bg-color', '#ffffff')
  const textColor = useCssCustomProperty('--text-color', '#000000')
  const innerColor = useLocalStorage('inner-color', '#00aaee')
  const outerColor = useLocalStorage('outer-color', '#ee00cc')

  return (
    <section>
      <h1>Colors</h1>
      <label>BG
        <input type='text' {...backgroundColor} />
        <input type='color' {...backgroundColor} />
      </label>
      <br />
      <label>Text
        <input type='text' {...textColor} />
        <input type='color' {...textColor} />
      </label>
      <br />
      <label>Inner Bar
        <input type='text' {...innerColor} />
        <input type='color' {...innerColor} />
      </label>
      <br />
      <label>Outer Bar
        <input type='text' {...outerColor} />
        <input type='color' {...outerColor} />
      </label>
    </section>
  )
}