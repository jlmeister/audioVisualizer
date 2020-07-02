import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GraphicsContextProvider } from "./components/context/GraphicsContext";
import { AudioContextProvider } from "./components/context/AudioContext";

ReactDOM.render(
  <React.StrictMode>
    <GraphicsContextProvider>
      <AudioContextProvider>
        <App />
      </AudioContextProvider>
    </GraphicsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
