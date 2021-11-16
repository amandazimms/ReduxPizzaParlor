import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
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
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
      <PizzaList pizzaList={pizzaList}/> 
    </div>
  );
}

export default App;
