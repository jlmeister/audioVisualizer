import React, { useContext } from 'react';
import { Canvas } from './components/Canvas';
import { ControlPanel } from './components/ControlPanel';
import './App.css'
import { AudioContext } from './components/context/AudioContext';

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
  const analyserRef = useContext(AudioContext)
  console.log('hi ', analyserRef)

  // capture current frequency data and pass it to callback function
  function getFrequencyData(callback) {
    if (!analyserRef.current) return;

    // bufferLength is the length of our array, equal to half the fftSize
    const bufferLength = analyserRef.current.frequencyBinCount
    // Uint8Array is 8-bit unsigned int (values from 0 to 255)
    const amplitudeArray = new Uint8Array(bufferLength)
    // fill the array with current frequency data from the analyserRef
    analyserRef.current.getByteFrequencyData(amplitudeArray)
    // call the draw function to display the data
    callback(amplitudeArray)
  }

  return (
    <div>
      <Canvas getFrequencyData={getFrequencyData} />
      <ControlPanel />
    </div>
  );
}

export default App;