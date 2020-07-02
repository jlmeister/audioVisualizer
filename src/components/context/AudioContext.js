import React, { createContext, useContext } from 'react';
import { useAudioStream } from "../hooks";
import { GraphicsContext } from './GraphicsContext';

export const AudioContext = createContext()

export const AudioContextProvider = ({ children }) => {
  console.log('something caused AudioContextProvider to rerender')
  const { resolution } = useContext(GraphicsContext)
  const analyser = useAudioStream(resolution.value)
  console.log('hmmm ', analyser)

  return (
    <AudioContext.Provider value={analyser} >
      {children}
    </AudioContext.Provider>
  )
}