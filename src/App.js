import React from 'react';
import { Canvas } from './components/Canvas';
import { useAudioStream } from "./components/hooks/useAudioStream";

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

function App() {
  const analyser = useAudioStream()

  /**
   * @function getFrequencyData(drawFunction) - capture current frequency data and pass it to draw function
   */
  function getFrequencyData(drawFunction) {
    if (!analyser) return;

    // bufferLength is the length of our array, equal to half the fftSize
    const bufferLength = analyser.frequencyBinCount
    // Uint8Array is 8-bit unsigned int (values from 0 to 255)
    const amplitudeArray = new Uint8Array(bufferLength)
    // fill the array with current frequency data from the analyser
    analyser.getByteFrequencyData(amplitudeArray)
    // call the draw function to display the data
    drawFunction(amplitudeArray)
    // requestAnimationFrame(() => getFrequencyData(console.log))
  }

  return (
    <div className="App">
      <Canvas getFrequencyData={getFrequencyData} />
    </div>
  );
}

export default App;