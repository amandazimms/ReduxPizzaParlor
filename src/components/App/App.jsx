import React from 'react';
import axios from 'axios';
import './App.css';
import {useEffect} from "react";
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const pizzas = useSelector(store=> store.pizzas);
  const orders = useSelector(store=> store.orders);
  const dispatch = useDispatch();

  useEffect( () => {
    console.log( 'component loaded' );
    getPizzas();
  }, []);

  const addCustomer = () => {
    let orderToSend = {
      //add order Info here
    }
    
    axios.post(`/api/order`, orderToSend).then (( response )=>{
      console.log('IN POST: ', orderToSend);
      dispatch({type: 'ADD_CUSTOMER', payload: orderToSend});
    }).catch( ( err )=>{
      console.log( err );
      alert( 'problem!' );
    })
  }

  const getPizzas = () =>{
    axios.get('/api/pizza').then ( ( response )=>{
      console.log('In Get:', response.data);
      dispatch({type: 'GET', payload: response.data});
  }).catch( ( err )=>{
      console.log( err );
      alert( 'problem!' );
  }) 
  }
  
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
      <button onClick={addCustomer}>Test Add Customer</button>
      <p>{JSON.stringify(pizzas)}</p>
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
    </div>
  );
}

export default App;
