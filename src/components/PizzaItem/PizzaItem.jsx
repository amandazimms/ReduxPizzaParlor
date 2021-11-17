import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
    TableRow, Paper } from '@material-ui/core';

function PizzaItem( props ){
    // const[ name, setName ]=useState( null );
    const dispatch = useDispatch();
    const[cartButton, setCartButton]=useState(true);
    
    let cartPizzaID;

    const toggleCartButton=()=>{
        setCartButton(!cartButton);
    }

    const addToCart=()=>{
        cartPizzaID = props.pizza.id;
        dispatch({
            type: 'ADD_PIZZAS',
            payload: {cartPizzaID}
        })
        console.log('props.pizza.id:', cartPizzaID)
    }

    const removeFromCart=()=>{
        cartPizzaID = props.pizza.id
        console.log('remove cartPizzaID:', cartPizzaID);
        // cartToSend.cartPizzaIDs.splice(pizzaIndex, 1);
        dispatch({
            type: 'REMOVE_PIZZAS',
            payload: {cartPizzaID}
        })
    }

    function onClickAdd(){
        addToCart();
        toggleCartButton();
    }

    function onClickRemove(){
        removeFromCart();
        toggleCartButton();
    }

    return(
        <div>
            <h1>{props.pizza.name}</h1>
            <h3>{props.pizza.description}</h3>
            <img src={props.pizza.image_path} alt="" />
            <br></br>
            {
                cartButton?
                <Button onClick={onClickAdd}>Add to cart</Button>:
                <Button onClick={onClickRemove}>Remove from cart</Button>
            }
        </div>
    )
}

export default PizzaItem;