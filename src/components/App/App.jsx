import React from 'react';
import axios from 'axios';
import './App.css';
import {useEffect} from "react";
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const pizzas = useSelector(store=> store.pizzas);
  const dispatch = useDispatch();

  useEffect( () => {
    console.log( 'component loaded' );
    getPizzas();
  }, []);

  const getPizzas = () =>{
    dispatch( { type:'GET' } );
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
      <p>{JSON.stringify(pizzas)}</p>
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
    </div>
  );
}

export default App;
