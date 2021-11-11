import React from 'react';
import axios from 'axios';
import './App.css';
import {useEffect} from "react";
import {useState} from "react";

function App() {
  const [pizzas, setPizzas] = useState( [] );

  useEffect( () => {
    console.log( 'component loaded' );
    getPizzas();
  }, []);

  const getPizzas = ()=>{
    axios.get('/api/pizza' ).then (( response )=>{
      setPizzas(response.data);
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
      <p>{JSON.stringify(pizzas)}</p>
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>
    </div>
  );
}

export default App;
