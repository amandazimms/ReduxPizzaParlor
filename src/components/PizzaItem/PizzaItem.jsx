import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
    TableRow, Paper } from '@material-ui/core';


function PizzaItem( props ){
    // const[ name, setName ]=useState( null );
    const addToCart=()=>{
        
    }

    return(
        <div>
            <h1>{props.pizza.name}</h1>
            <h3>{props.pizza.description}</h3>
            <img src={props.pizza.image_path} alt="" />
            <br></br>
            <Button>Add to cart</Button>
        </div>
    )
}

export default PizzaItem;