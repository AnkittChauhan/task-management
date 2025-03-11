import React from 'react';
import TaskApp from './TaskApp';
import './index.css';
import bgImg from './assets/3Pokemons.jpg';

function App() {
  return (
    <div className="min-h-screen">
      <img src={bgImg} alt="BG-img" className="absolute -z-10 w-screen h-screen" />
      <TaskApp />
    </div>
  );
}

export default App;