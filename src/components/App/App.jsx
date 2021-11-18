import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import Admin from '../Admin/Admin'; //todo remove this before merging branch
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import PizzaList from '../PizzaList/PizzaList';
//------->BEGIN add: Customer component for link
import Customer from '../Customer/Customer'
import Header from '../Header/Header';
//<-------END add

function App() {
  const pizzas = useSelector(store=> store.pizzas);
  const orders = useSelector(store=> store.orders);
  const dispatch = useDispatch();
  const[pizzaList, setPizzaList]=useState([]);

  useEffect(()=>{
    getPizzaList();
    console.log( 'component loaded' );
  }, [])

  const getPizzaList=()=>{
    console.log('in getPizzaList');
    axios.get('api/pizza').then((response)=>{
      //console.log(response.data);
      setPizzaList(response.data);
    }).catch((err)=>{
      alert('Error getting PizzaList');
      console.log(err);
    })
  }

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
  
  return (
    <div className='App'>
      {/*------->BEGIN change: 
      Remove <header> and replace with <Header> component */}
      <Header />      
      {/*
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header> 
      <-------------END change    */}
      <BrowserRouter>
        <Routes>
             {/* reminder that the Admin page should not be linked, only reachable by visiting /Admin in URL  */}
            <Route path='/Admin' element={<Admin/>}></Route>
            <Route path='/customer' element={<Customer />}></Route>
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