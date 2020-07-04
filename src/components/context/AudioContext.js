import React, { createContext } from 'react';
import { useAudioStream, useLocalStorage } from "../hooks";

export const AudioContext = createContext()

export const AudioContextProvider = ({ children }) => {
  const resolution = useLocalStorage('resolution', 64) // only powers of 2
  const analyserRef = useAudioStream(resolution.value)

  return (
    <AudioContext.Provider value={{ resolution, analyserRef }} >
      {children}
    </AudioContext.Provider>
  )
}