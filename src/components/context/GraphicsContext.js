import React, { createContext } from 'react';

export const GraphicsContext = createContext()

export const GraphicsContextProvider = (props) => {
  

  return (
    <MovieContext.Provider value={[movies, setMovies]} >
      {props.children}
    </MovieContext.Provider>
  )
}