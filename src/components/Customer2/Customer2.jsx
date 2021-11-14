import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { TextField, Grid, Button, Box } from '@material-ui/core';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import './Customer2.css';

const useStyles = makeStyles({
    input: {
      marginLeft: "25px"
    //   marginBottom: "15px"
    //   backgroundColor: "grey"
    }
  }); 

function Customer2 ( props ){
    //reducer "stuff"
    const customer = useSelector( store=>store.customer );
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
    }

  return (
    <div>
        <Grid container>
            <Grid item xs={3}>
                <TextField
                    variant={'outlined'}
                    label={'Name'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                />
                <Box />
                <TextField
                    variant={'outlined'}
                    label={'Street Address'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                />
                <Box />
                <TextField
                    variant={'outlined'}
                    label={'City'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                />
                <Box />
                <TextField
                    variant={'outlined'}
                    label={'Zip Code'}
                    margin={'normal'}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    className={classes.input}
                />                  
            </Grid>
            <Grid item xs={2}>
               
            </Grid>
            <Grid item xs={2}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Order Type:</FormLabel>
                    <RadioGroup row
                                aria-label="order type"
                                defaultValue="pickup"
                                name="radio-buttons-group"
                                onChange={ ( event ) => handleOrderTypeChange ( event ) }
                    >
                    <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                    <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                    </RadioGroup>
                </FormControl>                
            </Grid>
            <Grid item xs={1} justifyContent={'space-between'} >
                <Button size="large" 
                        variant="contained" 
                        onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Next1   
                </Button>
                <Button size="large" 
                        variant="contained" 
                        onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Next2   
                </Button>
                <Button size="large" 
                        variant="contained" 
                        onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Next3   
                </Button>
                <Button size="large" 
                        variant="contained" 
                        onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Next4   
                </Button>
            </Grid>
      </Grid>
    </div>
  );
};

export default Customer2;