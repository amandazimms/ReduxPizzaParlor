import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

// customer reducer
const customer = ( state=[], action ) =>{
    if( action.type === 'ADD_CUSTOMER' ) {
      console.log( '------->in ADD_CUSTOMER' );
      return [...state, action.payload ];
    }
    return state; //<------THIS IS VERY IMPORTANT. DON'T FORGET IT!!
  }
// pizza reducer
const pizza = ( state= 35.98, action )=>{
  if( action.type === 'GET_ORDER_TOTAL' ){
    console.log( '------->GET_ORDER_TOTAL' );
    return state;
  }
  return state;
}
// a store
const storeInstance = createStore(
    combineReducers(
      {
        customer,
        pizza
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