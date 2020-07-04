import React, { useContext } from 'react';
import { Canvas } from './components/Canvas';
import { ControlPanel } from './components/ControlPanel';
import './App.css'
import { AudioContext } from './components/context/AudioContext';

/**
 * REQUIREMENTS
 * @choose_device
 *  - navigator.mediaDevices.enumerateDevices()
 */

function App() {
  const { analyserRef } = useContext(AudioContext)

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