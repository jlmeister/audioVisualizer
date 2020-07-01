import React from 'react';
import { Canvas } from './components/Canvas';
import { useAudioStream, useCssCustomProperty, useFormInput } from "./components/hooks";
import './App.css'

/**
 * HOW DOES THIS WORK?
 * ✅@function initAudio() - initialize an audio analyser and connect it to an audio streaming input
 * @function getFrequencyData(drawFunction) - capture current frequency data and pass it to draw function
 * @function draw(frequencyDataArray) - draw based on passed-in frequency data
 * @function runVisualizer() - does two things:
 *   Call getFrequencyData(draw)
 *   Call requestAnimationFrame(runVisualizer) 
 * On page load:
 *   initAudio()
 *   requestAnimationFrame(runVisualizer)
 */

/**
 * REQUIREMENTS
 * @color
 *  - background color
 *  - text color
 *  - color at the rectangle base (near circle radius)
 *  - color at the top of the rectangle (away from circle radius)
 * @scale
 *  - bar height
 *  - bar width
 *  - spacing
 *  - resolution
 * @radius
 * @starting_angle
 *  - is it possible?
 * @choose_device
 *  - navigator.mediaDevices.enumerateDevices()
 */

function App() {
  const backgroundColor = useCssCustomProperty('--bg-color')
  const textColor = useCssCustomProperty('--text-color', '#000000')
  const innerColor = useCssCustomProperty('--inner-color')
  const outerColor = useCssCustomProperty('--outer-color')
  const barHeightScale = useFormInput(1)
  const barWidth = useFormInput(2)
  const spacing = useFormInput(1)
  const resolution = useFormInput(512) // only powers of 2
  const radius = useFormInput(50)
  const startAngle = useFormInput(0)

  const analyser = useAudioStream()

  // capture current frequency data and pass it to callback function
  function getFrequencyData(callback) {
    if (!analyser) return;

    // bufferLength is the length of our array, equal to half the fftSize
    const bufferLength = analyser.frequencyBinCount
    // Uint8Array is 8-bit unsigned int (values from 0 to 255)
    const amplitudeArray = new Uint8Array(bufferLength)
    // fill the array with current frequency data from the analyser
    analyser.getByteFrequencyData(amplitudeArray)
    // call the draw function to display the data
    callback(amplitudeArray)
  }

  return (
    <div style={{color: 'var(--text-color)'}}>
      <Canvas getFrequencyData={getFrequencyData} />
      <div class='container' style={{padding: '0 50px'}}>
        <section>
          <h1>Colors</h1>
          <label>BG
            <input type='text' {...backgroundColor} />
          </label>
          <br/>
          <label>Text
            <input type='text' {...textColor} />
          </label>
          <br/>
          <label>Inner Bar
            <input type='text' {...innerColor} />
          </label>
          <br/>
          <label>Outer Bar
            <input type='text' {...outerColor} />
          </label>
        </section>
        <section>
          <h1>Scale</h1>
          <label>Bar Height
            <input type='range' {...barHeightScale} min={0.1} max={3} step={0.1}/>
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
      </div>
    </div>
  );
}

export default App;