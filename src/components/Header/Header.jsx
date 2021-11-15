import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import './Header.css';
import { Grid, Button } from '@material-ui/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

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
  const pizzaTotal = useSelector( store=>store.pizza );
  // we want to be able to dispatch to top of hierarchy
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className='header'>
      <Grid container>

        <Grid item xs={5}>
            <h2 className='header-title'>Prime Pizza</h2>
        </Grid>

        <Grid item xs={3} />  

        <Grid item xs={1}
              id={'shopping-cart-icon'}
              className={classes.cartIcon}>
              <ShoppingCartIcon fontSize="large"/> 
        </Grid>   

        <Grid item xs={3}
              id={'shopping-cart-total'}
              className={classes.cartTotal}>
            <p>Total: $</p><p>{pizzaTotal}</p>
        </Grid>      
      </Grid>
    </div>
  );
}

export default Header;