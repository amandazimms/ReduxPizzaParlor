import React from 'react';
import axios from 'axios';
import './App.css';
import Admin from '../Admin/Admin'; //todo remove this before merging branch
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
      
      <BrowserRouter>
        <Routes>
            <Route path='/Admin' element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
