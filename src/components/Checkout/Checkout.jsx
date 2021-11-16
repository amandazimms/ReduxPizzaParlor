import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Header from '../Header/Header';

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
      
    } );

    const handleCloseAgree = () => {
      console.log( 'inhandleCloseAgree' );

      //axios call to server here with the placeOrder object
      //i can ignore the index.js altogether except for the 'EMPTY' dispatch
      //routes the user back to the homepage, which I'm not entirely sure how to
      //format in a function as apposed to a link on the DOM
       //  ()=>dispatch({ type: 'EMPTY' });
    }


    return(
      <Container>
      <Header />
      <Typography variant="h2">Step 3: Checkout</Typography>
        <Grid container spacing={2} component={Paper}>

          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">orders.customerName</Typography>
                <Typography variant="h5">orders.streetAddress</Typography>
                <Typography variant="h5">orders.city, orders.zip</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">orders.type?</Typography>
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
              <Paper><Typography variant="h4">Total: pizzas.total</Typography></Paper>
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
          <Button onClick={handleCloseAgree} autoFocus>
            Agree
          </Button>
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