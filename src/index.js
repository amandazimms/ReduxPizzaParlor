import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';

const pizzas =  (state = [], action) => {
    if ( action.type === 'GET' ){ //todo could be important to change this to GET_PIZZA - else it may conflict with GET in const orders below once they are combined
      console.log('get pizza');
      return [...state, action.payload];
    }

    if (action.type === 'ADD_PIZZAS'){
      return [...state, action.payload];
    }

    return state;
}

const orders =  (state = [], action) => {
  if ( action.type === 'ADD_CUSTOMER' ){
      return [...state, action.payload];
  }

  if (action.type === 'POST'){
    state = [...state, action.payload]
    axios.post(`/api/order`, [...state, action.payload]).then (( response )=>{
      console.log('IN POST: ', state);
      state = [];
      // trying to figure out what other calls we want here too
    }).catch( ( err )=>{
      console.log( err );
      alert( 'problem!' );
    })
  }

  if (action.type === 'SET_ORDERS'){
    return [...state, action.payload];
  }


  //v DO NOT DELETE THIS AFTER ALL v
  if ( action.type === 'GET' ){
    console.log('get orders');
    axios.get('/api/order').then ( ( response )=>{
        console.log('In Get:', response.data);
        return [...state, response.data];
    }).catch( ( err )=>{
        console.log( err );
        alert( 'problem!' );
    }) 
  }
  return state;
}

// a store
const storeInstance = createStore(
    combineReducers(
      {
        pizzas,
        orders
      }
    ),
    applyMiddleware(
      logger
    )
  );

ReactDOM.render(
  <Provider store={storeInstance}>
      <App />
  </Provider>, 
  document.getElementById('root'));
