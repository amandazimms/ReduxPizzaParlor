import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Header from '../Header/Header'

function Checkout( props ){

    // function createData(name, cost) { 
    //     return { name, cost };
    //   }
      
    const rows = pizzas;
    // const[ name, setName ]=useState( null );

    const pizzas = useSelector(store => store.pizzas);
    const orders = useSelector(store => store.orders);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDisagree = () => {
      setOpen(false);
    };

    //I need a new object to send to the server since I'm not passing it through index.js
    //I need a function to set the object when the user clicks agree
    const[ placeOrder, setPlaceOrder ]=useState( {
        customer_name: '',
        street_address: '',
        city: '',
        zip: '',
        type: '',
        total: 0,
        selectedPizzas: []
    } );

    const handleCloseAgree = () => {
      console.log( 'inhandleCloseAgree' );
      //i need to setPlaceOrder here. not sure how to syntax this right,
      //use store to set the values of this object
      setPlaceOrder( {
        ...placeOrder, 
        customer_name: orders.customerName,
        street_address: orders.streetAddress,
        city: orders.city,
        zip: orders.zip,
        type: orders.orderType,
        total: pizzas.total,
        selectedPizzas: pizzas
      });
      //i think this is a bit off
      axios.post( `/api/order`, placeOrder ).then( (response)=>{
        dispatch({ type: 'EMPTY', payload: [] });
      }).catch((err)=>{
         alert('POST Failed');
         console.log(err);
      });
    }


    return(
      <Container>
      <Header />
      <Typography variant="h2">Step 3: Checkout</Typography>
        <Grid container spacing={2} component={Paper}>

          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">{orders.customerName}</Typography>
                <Typography variant="h5">{orders.streetAddress}</Typography>
                <Typography variant="h5">{orders.city, orders.zip}</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">{orders.orderType}</Typography>
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={1} />
          <Grid item xs={10}>
            <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6">Name</Typography></TableCell>
                    <TableCell align="right"><Typography variant="h6">Cost</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow>
                      <TableCell><Typography variant="subtitle1">{row.name}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="subtitle1">{row.price}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={8} />
          <Grid item xs={4}>
            <Box p={3}>
              <Paper><Typography variant="h4">Total: {pizzas.total}</Typography></Paper>
            </Box>
          </Grid>

          <Grid item xs={4} />
          <Grid item xs={4}>
            <Box pb={5}>
              <Button variant="contained" color="primary" size="large" style={{fontSize: 24}} onClick={handleClickOpen}>Checkout</Button>

              <Dialog
        open={open}
        onClose={handleCloseAgree, handleCloseDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you are ready to checkout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            As soon as you click Agree, your order will be placed and hot, tasty pizza will
            be on its way to you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree}>Disagree</Button>
          <Button onClick={handleCloseAgree} autoFocus><Link to="/">
            Agree
            </Link></Button>
        </DialogActions>
      </Dialog>

            </Box>
          </Grid>
          <Grid item xs={4} />

        </Grid>
      </Container>
    )
}

export default Checkout;