import { useState, useEffect } from 'react';

export const useAudioStream = () => {
  const [analyser, setAnalyser] = useState(null)

  // initialize an audio analyser and connect it to an audio streaming input
  function initAudio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)() // create audio context
        const source = audioCtx.createMediaStreamSource(stream) // create source node
        const analyserNode = audioCtx.createAnalyser()  // create analyser

        analyserNode.fftSize = 1024 // set this to change the resolution (can only be a power of 2)
        source.connect(analyserNode)  // connect source to analyser
        setAnalyser(analyserNode)     // save the analyser
      })
  }

  useEffect(initAudio, [])
  
  return analyser;
}
