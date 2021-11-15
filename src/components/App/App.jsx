import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header'
import Customer from '../Customer/Customer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  // we want to be able to dispatch to top of hioerarchy
  const dispatch = useDispatch();
  return (
    <div className='App'>
      {/* <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header> */}
      {/* <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p> */}
      <Customer />
    </div>
  );
}

export default App;