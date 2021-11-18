import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { TextField, Grid, Button, Box, Paper } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Header from '../Header/Header'
import './Customer.css';
import Checkout from '../Checkout/Checkout.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const useStyles = makeStyles({
    input: {
      marginLeft: "25px"
    }
  }); 

function Customer ( props ){
    //reducer "stuff"
    const dispatch = useDispatch();
    const classes = useStyles();
 
    const[ newCustomer, setNewCustomer ] = useState( { } );

    //By using event.target.id, we can know which customer property is being changed. Therefore, we only
    //need one function to handle the change on all input texts on the screen.
    const handleChange = ( event ) =>{
        setNewCustomer( {...newCustomer, [ event.target.id ] : event.target.value } );
    }
    //I created a separate event handler for the radio button since I made unique IDs for each.
    //I made unique IDs in order to link it to the label. Radio button "id" attribute should
    //link to "for" attribute on label.
    const handleOrderTypeChange = ( event ) =>{
        setNewCustomer( {...newCustomer, orderType : event.target.value } );
        console.log(event.target);
    }

  return (
    <div>
        <Header headerType="CUSTOMER" />
        <h2 id="customerTitle">Step 2: Customer Information</h2>
        {/* <p> props: { JSON.stringify( customer ) } </p> */}
        <div class="customer-input"></div>
        <Grid container>
            <Grid item xs={3}>
                <TextField
                    id={'customerName'}
                    variant={'outlined'}
                    label={'Name'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                    onChange={ (event ) =>handleChange ( event )}
                />
                <Box />
                <TextField
                    id={'streetAddress'}
                    variant={'outlined'}
                    label={'Street Address'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                    onChange={ (event ) =>handleChange ( event )}
                />
                <Box />
                <TextField
                    id={'city'}
                    variant={'outlined'}
                    label={'City'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                    onChange={ (event ) =>handleChange ( event )}
                />
                <Box />
                <TextField
                    id={'zip'}
                    variant={'outlined'}
                    label={'Zip Code'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                    onChange={ (event ) =>handleChange ( event )}
                />                  
            </Grid>
            <Grid item xs={2}>
               {/* Empty space */}
            </Grid>
            <Grid item xs={1}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Order Type:</FormLabel>
                    <RadioGroup row
                                aria-label="order type"
                                // defaultValue="pickup"
                                name="radio-buttons-group"
                                onChange={ ( event ) => handleOrderTypeChange ( event ) }
                    >
                    <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                    <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                    </RadioGroup>
                </FormControl>                
            </Grid>
            <Grid item xs={6}>
                {/* Empty space for last 6 columns of 12-column row */}
            </Grid>
            <Grid item xs={6}>
                {/* Empty space for first 6 columns of 12-column row */}
            </Grid>
            <Grid item xs={2}>
                <Button id="add-customer"
                        size="large" 
                        variant="contained" 
                        onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>
                        <Link to="/checkout">Next</Link>
                </Button>
            </Grid>
      </Grid>
    </div>
  );
};

export default Customer;