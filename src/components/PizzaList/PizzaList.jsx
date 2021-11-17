import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import PizzaItem from "../PizzaItem/PizzaItem";
import Header from "../Header/Header";
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper, Link } from '@material-ui/core';
import { shadows } from '@mui/system';

function PizzaList( props ){
    // const[ name, setName ]=useState( null );

    return(
        <div>
            <Header headerType="ORDER"/>
            <Container maxWidth="xl">
                <Typography variant="h2" sx={{ textAlign: 'left' }}>Step 3: Select Your Pizza</Typography>
                    <Grid container spacing={2} justify="center" sx={{boxShadow: 3}}>
                        {
                            props.pizzaList.map(pizza =>(
                                <PizzaItem pizza={pizza} />
                            ))
                        }
                    </Grid>
                <Button id="go-to-custumer-info"
                        size="large" 
                        variant="contained" >
                        <Link to="/checkout">Next</Link>
                </Button>
            </Container>
        </div>
    )
}

export default PizzaList;