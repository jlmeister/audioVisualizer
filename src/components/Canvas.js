import React, { useRef, useEffect } from 'react';

/**
 * @TODO
 * @function getPixelRatio(context)
 * Get the pixel ratio for the device so resolution doesn't look fuzzy on some devices
 */

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

const Canvas = ({ getFrequencyData, ...props }) => {
  // create a Ref for the canvas DOM node
  const canvasRef = useRef(null)
  
  function draw(frequencyDataArray) {
    const canvas = canvasRef.current // select the canvas element from the DOM
    const context = canvas.getContext('2d') // create a 2D canvas context

    context.clearRect(0, 0, canvas.width, canvas.height) // clear the canvas
    // draw the bars
    for (let i = 0; i < frequencyDataArray.length; i++) {
      context.save()
      context.fillStyle = `rgb(${5 * i}, ${255 - 5 * i}, 255)`
      context.translate(10 + i*2, canvas.height - 10)
      context.fillRect(0, 0, 1, -frequencyDataArray[i]*1.5)
      context.restore()
    }
  }

  function runVisualizer() {
    getFrequencyData(draw)
    let requestId = requestAnimationFrame(runVisualizer)

    return () => {
      cancelAnimationFrame(requestId)
    }
  }
  useEffect(runVisualizer)

  return <canvas width={window.innerWidth} height={window.innerHeight * 2 / 3} ref={canvasRef} {...props} />
}

export { Canvas }