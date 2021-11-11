import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';

const pizzas = (state = [], action) => {
    if ( action.type === 'GET' ){
        axios.get('/api/pizza').then (( response )=>{
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
        pizzas
      }
    ),
    applyMiddleware(
      logger
    )
  );

ReactDOM.render(
<React.StrictMode>
    <Provider store={storeInstance}>
        <App /> 
    </Provider>
</React.StrictMode>,
document.getElementById('root'));
