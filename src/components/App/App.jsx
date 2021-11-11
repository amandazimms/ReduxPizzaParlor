import React from 'react';
import axios from 'axios';
import './App.css';
import Testerooni from '../Testerooni/Testerooni'
import Mimi from '../Mimi/Mimi';

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
  
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>

      <Testerooni/>
      <Mimi />
  
    </div>
  );
}

export default App;
