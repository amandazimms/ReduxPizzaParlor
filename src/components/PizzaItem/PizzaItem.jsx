import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
    TableRow, Paper } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { shadows } from '@mui/system';
import { isPropertyAccessExpression } from 'typescript';

function PizzaItem( props ){
    // const[ name, setName ]=useState( null );
    const dispatch = useDispatch();
    const[cartButton, setCartButton]=useState(true);
    
    // let cartPizzaID;
    let cartObject = {
        cartPizzaID: 0,
        cartPizzaPrice: 0
    }

    const toggleCartButton=()=>{
        setCartButton(!cartButton);
    }

    const addToCart=()=>{
        cartObject.cartPizzaID = props.pizza.id;
        cartObject.cartPizzaPrice += Number(props.pizza.price);

        dispatch({
            type: 'ADD_PIZZAS',
            payload: cartObject
        })
        
    }

    const removeFromCart=()=>{
        cartObject.cartPizzaID = props.pizza.id;
        cartObject.cartPizzaPrice += Number(props.pizza.price);
        dispatch({
            type: 'REMOVE_PIZZAS',
            payload: {cartObject}
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
            <Box sx={{boxShadow: 3}} m={2} pt={1} >
                <Grid item sx={4} >
                    <Card sx={{ maxWidth: 400 }}>
                        <Typography gutterBottom variant="h5" component="div">{props.pizza.name}</Typography>
                        <CardMedia
                            component="img"
                            height="300"
                            image={props.pizza.image_path}
                        />
                        <Typography variant="body2" color="text.secondary">{props.pizza.description}</Typography>
                        <Typography gutterBottom variant="h5" component="div">${props.pizza.price}</Typography>
                        <br></br>
                        {
                            cartButton?
                            <Button onClick={onClickAdd}>Add to cart</Button>:
                            <Button onClick={onClickRemove}>Remove from cart</Button>
                        }
                    </Card>
                </Grid>
            </Box>
        </div>
    )
}

export default PizzaItem;