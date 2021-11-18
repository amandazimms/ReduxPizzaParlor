import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Header from '../Header/Header'

function Checkout( props ){
    // const[ name, setName ]=useState( null );

    const pizzas = useSelector(store => store.pizzas);
    const orders = useSelector(store => store.orders);

    const rows = pizzas;
    //this is for the map on the DOM, not sure if it's redundant or necessary?

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    //this is for the confirmation dialogue, to start it as closed

    const handleClickOpen = () => {
      setOpen(true);
      //this is the function that opens the confirmation dialogue on button click
    };
  
    const handleCloseDisagree = () => {
      setOpen(false);
      //this closes it again if the user clicks "disagree"
    };

    //this is a hook to set the object I'm going to send via POST
    const[ placeOrder, setPlaceOrder ]=useState( {
        customer_name: '',
        street_address: '',
        city: '',
        zip: '',
        type: '',
        total: 0,
        selectedPizzas: []
    } );

    //this is the onClick function for the Agree button
    const handleCloseAgree = () => {
      console.log( 'inhandleCloseAgree' );
      //set the value of the object using values from the store
      setPlaceOrder( {
        ...placeOrder, 
        customer_name: orders.newCustomer.customerName,
        street_address: orders.newCustomer.streetAddress,
        city: orders.newCustomer.city,
        zip: orders.newCustomer.zip,
        type: orders.newCustomer.orderType,
        total: pizzas.total,
        selectedPizzas: pizzas
      });
      //send to the database via POST
      axios.post( `/api/order`, placeOrder ).then( (response)=>{
        //send a dispatch with an empty array to empty out the store
        dispatch({ type: 'EMPTY', payload: [] });
      }).catch((err)=>{
         alert('POST Failed');
         console.log(err);
      });
    }


    return(
      <Container><p>{JSON.stringify(orders.newCustomer)}</p>
      <Header headerType='CHECKOUT'/>
      <Typography variant="h2">Step 3: Checkout</Typography>
        <Grid container spacing={2} component={Paper}>

          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">{orders[0].newCustomer.customerName}</Typography>
                <Typography variant="h5">{orders[0].newCustomer.streetAddress}</Typography>
                <Typography variant="h5">{orders[0].newCustomer.city, orders[0].newCustomer.zip}</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">{orders[0].newCustomer.orderType}</Typography>
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
            Click Agree: your order will be placed and hot, tasty pizza will
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