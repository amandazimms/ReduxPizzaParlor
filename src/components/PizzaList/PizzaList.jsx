import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import PizzaItem from "../PizzaItem/PizzaItem";
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
    TableRow, Paper } from '@material-ui/core';
import { shadows } from '@mui/system';

function PizzaList( props ){
    // const[ name, setName ]=useState( null );

    let cartTotal = 0;

    return(
        <div>
            <Container maxWidth="xl">
            <Typography variant="h2" sx={{ textAlign: 'left' }}>Step 3: Select Your Pizza</Typography>
            <Grid container spacing={2} justify="center" sx={{boxShadow: 3}}>
            {
                props.pizzaList.map(pizza =>(
                    <PizzaItem pizza={pizza} />
                ))
            }
            </Grid>
            <Button>Next</Button>
            </Container>
        </div>
    )
}

export default PizzaList;