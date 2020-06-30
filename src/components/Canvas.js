import React, { useRef, useEffect } from 'react';

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
 * @TODO
 * @function getPixelRatio(context)
 * Get the pixel ratio for the device so resolution doesn't look fuzzy on some devices
 */

const Canvas = ({ getFrequencyData, ...props }) => {
  // create a Ref for the canvas DOM node
  const canvasRef = useRef(null)
  // create a function for the recursive drawing animation
  useEffect(() => {
    // select the canvas element from the DOM
    const canvas = canvasRef.current
    // create a 2D canvas context
    const context = canvas.getContext('2d')
    let requestId, i = 0;
    const draw = frequencyDataArray => {
      // do draw stuff here
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.beginPath()
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        (canvas.height / 3) * Math.abs(Math.cos(i)),
        0,
        2 * Math.PI
      )
      context.fill()
      i += 0.05
      requestId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(requestId)
    }
  })
  console.log('count me for every render')

  return <canvas ref={canvasRef} {...props} />
}

export { Canvas }