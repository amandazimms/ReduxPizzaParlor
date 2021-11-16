import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Admin from '../Admin/Admin'; //todo remove this before merging branch
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import PizzaList from '../PizzaList/PizzaList';

function App() {
  const[pizzaList, setPizzaList]=useState([]);

  useEffect(()=>{
    getPizzaList();
  }, [])

  const getPizzaList=()=>{
    console.log('in getPizzaList');
    axios.get('api/pizza').then((response)=>{
      console.log(response.data);
      setPizzaList(response.data);
    }).catch((err)=>{
      alert('Error getting PizzaList');
      console.log(err);
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
      
      <BrowserRouter>
        <Routes>
            {/* reminder that the Admin page should not be linked, only reachable by visiting /Admin in URL */}
            <Route path='/Admin' element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
      <Checkout />
      <PizzaList pizzaList={pizzaList}/> 
    </div>
  );
}

export default App;