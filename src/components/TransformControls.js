import React, { useContext } from 'react';
import { useLocalStorage } from './hooks';
import { AudioContext } from './context/AudioContext';

export function TransformControls() {
  const { resolution } = useContext(AudioContext)
  const startAngle = useLocalStorage('start-angle', 0)
  const shape = useLocalStorage('shape', 'line')
  const clearLocalStorage = () => {
    window.localStorage.clear()
    window.location.reload()
  }

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
      <br/>
      <label>Shape
        <select {...shape}>
          <option>line</option>
          <option>circle</option>
        </select>
      </label>
      <br/>
      <button onClick={clearLocalStorage}>Reset Defaults</button>
    </section>
  )
}