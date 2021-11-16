import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';

const pizzas =  (state = [], action) => {
    if ( action.type === 'GET_PIZZAS' ){
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

  if (action.type === 'POST_ORDERS'){
    state = [...state, action.payload]
    axios.post(`/api/order`, [...state, action.payload]).then (( response )=>{
      console.log('IN POST orders: ', state);
      state = [];
      // trying to figure out what other calls we want here too
    }).catch( ( err )=>{
      console.log( err );
      alert( 'problem!' );
    })
  }

  if ( action.type === 'GET_ORDERS' ){
    axios.get('/api/order').then ( ( response )=>{
        console.log('In Get orders:', response.data);
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
