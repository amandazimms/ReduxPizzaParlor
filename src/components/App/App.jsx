import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
<<<<<<< HEAD
import {useEffect} from "react";
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

function App() {
  const pizzas = useSelector(store=> store.pizzas);
  const orders = useSelector(store=> store.orders);
  const dispatch = useDispatch();
=======
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
>>>>>>> 39c1c4f425aef863d5996248cad8128a6aec8b82

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
<<<<<<< HEAD
      <button onClick={addCustomer}>Test Add Customer</button>
      <p>{JSON.stringify(pizzas)}</p>
=======
      
      <BrowserRouter>
        <Routes>
            {/* reminder that the Admin page should not be linked, only reachable by visiting /Admin in URL */}
            <Route path='/Admin' element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
>>>>>>> 39c1c4f425aef863d5996248cad8128a6aec8b82
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
      <Checkout />
      <PizzaList pizzaList={pizzaList}/> 
    </div>
  );
}

export default App;