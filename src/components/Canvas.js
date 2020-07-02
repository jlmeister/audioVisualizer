import React, { useRef, useEffect, useContext } from 'react';
import { GraphicsContext } from "./context/GraphicsContext";

/**
 * @TODO
 * @function getPixelRatio(context)
 * Get the pixel ratio for the device so resolution doesn't look fuzzy on some devices
 */

/**
 * HOW DOES THIS WORK?
 * @function initAudio() - initialize an audio analyser and connect it to an audio streaming input
 * @function getFrequencyData(drawFunction) - capture current frequency data and pass it to draw function
 * @function draw(frequencyDataArray) - draw based on passed-in frequency data
 * @function runVisualizer() - does two things:
 *   Call getFrequencyData(draw)
 *   Call requestAnimationFrame(runVisualizer)
 * On page load:
 *   initAudio()
 *   requestAnimationFrame(runVisualizer)
 */

function Canvas({ getFrequencyData, ...props }) {
  // create a Ref for the canvas DOM node
  const canvasRef = useRef(null)
  const { innerColor, outerColor, barHeightScale, barWidth, spacing,  } = useContext(GraphicsContext)
  
  function draw(frequencyDataArray) {
    const canvas = canvasRef.current // select the canvas element from the DOM
    const context = canvas.getContext('2d') // create a 2D canvas context

    context.clearRect(0, 0, canvas.width, canvas.height) // clear the canvas
    // draw the bars
    for (let i = 0; i < frequencyDataArray.length; i++) {
      context.save()
      const gradient = context.createLinearGradient(0, 0, 0, -frequencyDataArray[i] * barHeightScale.value)
      if (innerColor.value.length === 7 && outerColor.value.length === 7) {
        gradient.addColorStop(0, innerColor.value)
        gradient.addColorStop(1, outerColor.value)
      }
      // context.fillStyle = `rgb(${5 * i}, ${255 - 5 * i}, 255)`
      context.fillStyle = gradient
      context.translate(100 + i*(spacing.value + barWidth.value), canvas.height - 10)
      context.fillRect(0, 0, barWidth.value, -frequencyDataArray[i]*barHeightScale.value)
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