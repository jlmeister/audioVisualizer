import React, { useRef, useEffect } from 'react';

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
  
  function draw(frequencyDataArray) {
    const canvas = canvasRef.current // select the canvas element from the DOM
    const context = canvas.getContext('2d') // create a 2D canvas context
    const innerColor = window.localStorage.getItem("inner-color");
    const outerColor = window.localStorage.getItem("outer-color");
    const barHeightScale = Number(window.localStorage.getItem("bar-height-scale"));
    const barWidth = Number(window.localStorage.getItem("bar-width"));
    const spacing = Number(window.localStorage.getItem("spacing"));
    const radius = Number(window.localStorage.getItem("radius"));
    const shape = window.localStorage.getItem("shape");

    context.clearRect(0, 0, canvas.width, canvas.height) // clear the canvas
    // draw the bars

    /**
     * // set to the size of device
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// find the center of the window
center_x = canvas.width / 2;
center_y = canvas.height / 2;
radius = 150;
//draw a circle
ctx.beginPath();
ctx.arc(center_x,center_y,radius,0,2*Math.PI);
ctx.stroke();
for(var i = 0; i < frequencyDataArray.length; i++){
//divide a circle into equal parts
rads = Math.PI * 2 / frequencyDataArray.length;
bar_height = 100;
bar_width = 2;
x = center_x + Math.cos(rads * i) * (radius);
y = center_y + Math.sin(rads * i) * (radius);
x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
//draw a bar
drawBar(x, y, x_end, y_end, bar_width);
}
     */
    switch (shape) {
      case 'line':
        for (let i = 0; i < frequencyDataArray.length; i++) {
          context.save()
          const gradient = context.createLinearGradient(0, 0, 0, -frequencyDataArray[i] * barHeightScale)
          if ((innerColor.length === 7 || innerColor.length === 9) && (outerColor.length === 7 || outerColor.length === 9)) {
            gradient.addColorStop(0, innerColor)
            gradient.addColorStop(1, outerColor)
          }
          context.fillStyle = gradient
          context.translate(i * (barWidth + spacing), canvas.height - 10)
          context.fillRect(0, 0, barWidth, -frequencyDataArray[i] * barHeightScale)
          context.restore()
        }
        break;
      case 'circle':
        // find the center of the window
        const center_x = canvas.width / 2;
        const center_y = canvas.height / 2;
        // //draw a circle
        // context.beginPath();
        // context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
        // context.stroke();
        for (var i = 0; i < frequencyDataArray.length; i++) {
          //divide a circle into equal parts
          const rads = Math.PI * 2 / frequencyDataArray.length;
          const bar_height = frequencyDataArray[i] * barHeightScale;
          const x = center_x + Math.cos(rads * i) * (radius);
          const y = center_y + Math.sin(rads * i) * (radius);
          const x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
          const y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
          const gradient = context.createLinearGradient(x, y, x_end, y_end)

          if ((innerColor.length === 7 || innerColor.length === 9) && (outerColor.length === 7 || outerColor.length === 9)) {
            gradient.addColorStop(0, innerColor)
            gradient.addColorStop(1, outerColor)
          }
          context.strokeStyle = gradient
          context.lineWidth = barWidth;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x_end, y_end);
          context.stroke();
        }
        break;
      default:
        break;
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

  return <canvas width={window.innerWidth} height={window.innerHeight} ref={canvasRef} {...props} />
}

export { Canvas }