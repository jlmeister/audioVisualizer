import { useEffect, useRef } from 'react';

export function useAudioStream(resolution) {
  const analyserRef = useRef(null)
  console.log('inside useAudioStream')

  // initialize an audio analyser and connect it to an audio streaming input
  function initAudio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log("initializing audio...")
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)() // create audio context
        const source = audioCtx.createMediaStreamSource(stream) // create source node
        analyserRef.current = audioCtx.createAnalyser()  // create analyser
        analyserRef.current.fftSize = resolution * 2 // set this to change the resolution (can only be a power of 2)
        source.connect(analyserRef.current)  // connect source to analyser
      })
  }

  useEffect(initAudio, [])
  useEffect(() => {
    if (analyserRef.current === null) return;
    
    analyserRef.current.fftSize = resolution * 2
  }, [resolution])

  return analyserRef;
}
