import { useState } from "react";
// import {useDispatch, useSelector} from 'react-redux';
import { Typography, Grid, Container, Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
TableRow, Paper } from '@material-ui/core';

function Checkout( props ){

    function createData(name, cost) {
        return { name, cost };
      }
      
      const rows = [
        createData('Onamonapizza', 14.99),
        createData('Pepperoni', 15.99),
      ];
    // const[ name, setName ]=useState( null );

    // const pizza = useSelector(store => store.pizza);
    // const order = useSelector(store => store.order);

    // const dispatch = useDispatch();

    return(
        <div>
        <Container>
            <Typography variant="h2">Step 3: Checkout</Typography>
          <Grid container spacing={10} justify="center">
            <Grid item align="left" style={{ 
              border: 1,
              borderRadius: 15 }}>
                <Typography variant="h4">order.name</Typography>
                <Typography variant="h4">order.street_address</Typography>
                <Typography variant="h4">order.city, order.zip</Typography>
            </Grid>
            <Grid item align="right">
            <Typography variant="h4">order.type</Typography>
            </Grid>
          </Grid>
            <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography align="right" variant="h4">Total: order.total</Typography>
    <Button variant="contained" color="primary" size="large" style={{
      fontSize: 24
    }}>Checkout</Button>
  </Container>
  </div>
    )
}

export default Checkout;