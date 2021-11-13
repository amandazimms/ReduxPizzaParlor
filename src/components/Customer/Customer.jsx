import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import './Customer.css';

function Customer( props ){
    //reducer "stuff"
    const customer = useSelector( store=>store.customer );
    const dispatch = useDispatch();
 
    // const[ newCustomer, setNewCustomer ] = useState( { 
    //     customerName: '',
    //     streetAddress: '',
    //     city: '',
    //     zip: '',
    //     orderType: ''
    // } );
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
            <p id="customerTitle">Step 2: Customer Information</p>
            {/* <p> props: { JSON.stringify( customer ) } </p> */}
            <div class="customer-input">
                <Grid container>
                    <Grid item xs={7}>
                        <TextField id="customer-name" label="Name" variant="outlined" onChange={ ( event ) => handleChange ( event ) } />
                    </Grid>
                    <Grid item xs={5}>
                    <p>Pickup</p>
                    </Grid>
                    <Grid item xs={7}>
                    <TextField id="customer-address" label="Address" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>
                    <Grid item xs={5}>
                    <p>Delivery</p>
                    </Grid>        
                    <Grid item xs={12}>
                    <TextField id="customer-city" label="City" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField id="customer-zip" label="Zip Code" variant="outlined" onChange={ ( event ) => handleChange ( event ) }/>
                    </Grid>        
                </Grid>
            </div>
            
            {/* <form action="" method="get" class="form-customer">
                <div class="form-customer">
                    <input type="text" name="customerName" id="customerName" placeholder="Name" onChange={ ( event ) => handleChange ( event ) } />
                </div>
                <div class="form-customer">
                    <input type="text" name="streetAddress" id="streetAddress" placeholder="Street Address" onChange={ ( event ) => handleChange( event ) }/>
                </div>
                <div class="form-customer">
                    <input type="text" name="city" id="city" placeholder="City" onChange={ ( event ) => handleChange( event ) }/>
                </div>
                <div class="form-customer">
                    <input type="text" name="zip" id="zip" placeholder="Zip Code" onChange={ ( event )=> handleChange( event ) }/>
                </div>
                <div>
                    <input type="radio" id="orderPickup" 
                     name="orderType" value="Pickup" onClick={ handleOrderTypeChange } defaultChecked />
                    <label for="orderPickup">Pickup</label>

                    <input type="radio" id="orderDelivery" 
                     name="orderType" value="Delivery" onClick={ handleOrderTypeChange } />
                    <label for="orderDelivery">Delivery</label>
                </div>
            </form> */}
            <br />
            <br />
            <button onClick={ ()=>dispatch( { type: 'ADD_CUSTOMER',  payload: { newCustomer } } ) }>Add Customer</button>
        </div>
    )
}

export default Customer;