import { useState } from "react";
// import {useDispatch, useSelector} from 'react-redux';
import { Box, Button, Table, TableHead, TableBody, TableCell, TableContainer,
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
            <h1>Step 3: Checkout</h1>

            <Box align="left">
                <h3>order.name</h3>
                <h3>order.street_address</h3>
                <h3>order.city, order.zip</h3>
            </Box>
            <Box align="right">
                <h2>order.type</h2>
            </Box>
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
    <h1 align="right">Total: order.total</h1>
    <Button>Checkout</Button>

        </div>
    )
}

export default Checkout;