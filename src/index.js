import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';

const pizzas =  (state = [], action) => {
    if ( action.type === 'GET' ){
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

  if ( action.type === 'GET' ){
    axios.get('/api/order').then ( ( response )=>{
        console.log('In Get:', response.data);
        return [...state, response.data];
    }).catch( ( err )=>{
        console.log( err );
        alert( 'problem!' );
    }) 
}
//todo can remove 'annabel' and 'josie' placeholder/testing data once Admin successfully displays DB orders on DOM
// { name: 'Annabel', 
// orderTime: '11/13 at 7:13pm', 
// type: 'delivery', 
// cost: 27.99, 
// pizzas: [ 
//     {id: 1, quantity: 1}, 
//     {id: 5, quantity: 1} 
// ] },
// { name: 'Josie', orderTime: '11/13 at 6:29pm', type: 'pickup', cost: 21.99, pizzas: [ {id: 2, quantity: 1}, {id: 3, quantity: 1}, {id: 4, quantity: 1}  ] }

// ], action) => {
// return state;
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
