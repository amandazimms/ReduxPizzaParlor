import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Grid, TextField, Button } from '@material-ui/core';
import { Paper, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import './Customer.css';

const useStyles = makeStyles({
    input: {
      marginLeft: "25px",
      marginBottom: "15px",
      backgroundColor: "pink"
    }
  });

function Customer( props ){
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

    return(
        <div>
            <h2 id="customerTitle">Step 2: Customer Information</h2>
            {/* <p> props: { JSON.stringify( customer ) } </p> */}
            <div class="customer-input">

                {/*<Grid container>
                     <Grid item xs={6} className={classes.input}>
                        <TextField id="customer-name" label="Name" variant="outlined" onChange={ ( event ) => handleChange ( event ) } />
                    </Grid>

                    <Grid item xs={5}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Order Type:</FormLabel>
                            <RadioGroup row
                                aria-label="order type"
                                defaultValue="pickup"
                                name="radio-buttons-group"
                                onChange={ ( event ) => handleOrderTypeChange ( event ) }
                            >ß
                                <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
                                <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.input}>
                    <TextField id="customer-address" label="Address" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>
 

                    <Grid item xs={12} className={classes.input}>
                    <TextField id="customer-city" label="City" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>

                    <Grid item xs={12} className={classes.input}>
                    <TextField id="customer-zip" label="Zip Code" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>   

                    <Grid item xs={12} container className={classes.input}>
                    <Button size="large" variant="contained" onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Next</Button>
                    </Grid> 
                </Grid>*/}



            </div>

        </div>
    )
}

export default Customer;