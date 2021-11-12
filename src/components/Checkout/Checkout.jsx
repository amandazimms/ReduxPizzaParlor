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
        <Container>
            <Typography variant="h2">Step 3: Checkout</Typography>
          <Grid container component={Paper}>
            <Grid item>
              <Box px={10} py={5}>
                <Paper>
                  <Box p={3}>
                  <Typography variant="h4">order.name</Typography>
                  <Typography variant="h4">order.street_address</Typography>
                  <Typography variant="h4">order.city, order.zip</Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid>
            <Box px={10} py={5} >
              </Box>
            </Grid>
            <Grid>
            <Box px={10} py={5} >
              </Box>
            </Grid>
            <Grid item>
              <Box px={10} py={5}>
                <Paper item align="right">
                <Box p={3}>
                  <Typography variant="h4">order.type</Typography>
                  </Box>
                </Paper>
              </Box>
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
    <Box py={5}>
      <Paper>
        <Box p={2}>
          <Typography align="right" variant="h4">Total: order.total</Typography>
        </Box>
      </Paper>
    </Box>
    <Button variant="contained" color="primary" size="large" style={{
      fontSize: 24
    }}>Checkout</Button>
  </Container>
    )
}

export default Checkout;