import React from 'react';
import { useState } from "react";
import {useSelector} from 'react-redux';
import { Grid } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from "@material-ui/core/styles";
import './Header.css';

const useStyles = makeStyles({
  cartIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end"
  },
  cartTotal: {
    fontSize: "1.8em",
    display: "flex",
    justifyContent: "start",
    paddingLeft: "10px"
  }
});

function Header( props ) {
  const[ headerType, setHeaderType] = useState( props.headerType )
  //Get the pizza total each time the header is rendered to the DOM
  const pizzaTotal = useSelector( store=>store.pizzaTotal );
  const classes = useStyles();

function HideCartInfo() {
  return (
    <>
    </>
    )  
}

function ShowCartInfo() {
  return (
  <>
        <Grid item xs={1}
              id={'shopping-cart-icon'}
              className={classes.cartIcon}>
              <ShoppingCartIcon fontSize="large"/> 
        </Grid>   

        <Grid item xs={3}
              id={'shopping-cart-total'}
              className={classes.cartTotal}>
              <><p>Total: $</p><p>{pizzaTotal}</p></>
        </Grid>  
  </>
  )
}

  return (
    <div className='header'>
      {/* <p>{JSON.stringify(pizzaTotal)}</p> */}
      <Grid container>

        <Grid item xs={5}>
          { headerType === 'ADMIN' ? (
            <h2 className='header-title'>Prime Pizza Orders</h2>
          ) : (
            <h2 className='header-title'>Prime Pizza</h2>
          )}
        </Grid>

        <Grid item xs={3} />  

        { headerType === 'ORDER' || headerType === 'CUSTOMER' ? (
          <ShowCartInfo />
        ) : (
          <HideCartInfo />
        )}
         
      </Grid>
    </div>
  );
}

export default Header;