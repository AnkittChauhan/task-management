import React from 'react';
import TaskApp from './TaskApp';
import './index.css';

function App() {
  return (
    <div className="min-h-screen">
      <img src="./public/3Pokemons.jpg" alt="BG-img" className="absolute -z-10 w-screen h-screen" />
      <TaskApp />
    </div>
  );
}

export default App;