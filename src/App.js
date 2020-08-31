import React from 'react';
import ReactDOM from 'react-dom';

import Game from './fullGrid/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>The Game of Life</h1>
      <Game/>
    </div>
  );
}

export default App;
