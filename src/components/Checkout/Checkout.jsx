import { useState } from "react";
// import {useDispatch, useSelector} from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
TableRow, Paper } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function Checkout( props ){

    function createData(name, cost) { 
        return { name, cost };
      }
      
      const rows = [
        createData('Onamonapizza', 14.99), //store.pizza.name and cost will be used here instead
        createData('Pepperoni', 15.99), //do i need a listItem component if I don't need any functionality in my table?
      ];
    // const[ name, setName ]=useState( null );

    // const pizza = useSelector(store => store.pizza);
    // const order = useSelector(store => store.order);

    // const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDisagree = () => {
      setOpen(false);
    };

    const handleCloseAgree = () => {
      console.log( 'inhandleCloseAgree' );
      //()=>dispatch({ type: 'POST'});
      //so if the user selects OK, it sends the POST dispatch with no payload AND routes the
      //user back to the homepage, which I'm not entirely sure how to
      //format in a function as apposed to a link on the DOM
    }


    return(
      <Container><Typography variant="h2">Step 3: Checkout</Typography>
        <Grid container spacing={2} component={Paper}>

          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">order.name</Typography>
                <Typography variant="h5">order.street_address</Typography>
                <Typography variant="h5">order.city, order.zip</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Box p={3}>
              <Paper>
                <Typography variant="h5">order.type</Typography>
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
                      <TableCell align="right"><Typography variant="subtitle1">{row.cost}</Typography></TableCell>
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
              <Paper><Typography variant="h4">Total: order.total</Typography></Paper>
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