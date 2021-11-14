import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import {createStore, combineReducers, applyMiddleware} from 'redux';


const orders =  (state = [
  { name: 'Annabel', orderTime: '11/13 at 7:13pm', type: 'delivery', cost: 27.99, pizzas: ['pepperoni', 'margherita'] },
  { name: 'Josie', orderTime: '11/13 at 6:29pm', type: 'pickup', cost: 21.99, pizzas: ['supreme', 'mushroom'] }
  ], action) => {
  console.log('orderz:', state)
  return state;
}


// a store
const storeInstance = createStore(
  combineReducers(
    {
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