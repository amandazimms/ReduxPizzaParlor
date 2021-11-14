import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useSelector} from 'react-redux';


//DataTable is a sleek MUI collapsible table
function DataTable() {
    const orders = useSelector(store=> store.orders);

    const rows = orders;
        //todo can remove 'annabel' and 'josie' placeholder/testing data once Admin successfully displays DB orders on DOM
        // [{ 
        //     name: 'Annabel', 
        //     orderTime: '11/13 at 7:13pm', 
        //     type: 'delivery', 
        //     cost: 27.99, 
        //     pizzas: [ 
        //         {id: 1, quantity: 1}, 
        //         {id: 5, quantity: 1} 
        //     ] },

    return (

        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>

             {/* Table TITLES */}
                <TableCell/>
                {/* ^ empty cell to hold place for arrows beneath, which require no title */}
                <TableCell><h3>Name</h3></TableCell>
                <TableCell align="right"><h3>Time Order Placed</h3></TableCell>
                <TableCell align="right"><h3>Type</h3></TableCell>
                <TableCell align="right"><h3>Cost</h3></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {/* Table ROWS */}
            {rows.map((row) => (
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

function Row(props) {
    //comes with MUI collapsible table template (altered)
    //helper function that makes MUI rows out of our 'rows' variable

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          {/* Table CELLS that contain our data (passed from orders to rows) */}
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell align="right">{row.orderTime}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          <TableCell align="right">{row.cost}</TableCell>
        </TableRow>
        <TableRow>

          {/* Collapsible portion - shows which pizzas were on each order   */}
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <h4 align="center">Pizzas Ordered</h4>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    
                    {/* Map through the pizza objects and display their ID and QTY */}
                    {row.pizzas.map( (pizza) => (
                    <TableRow key={pizza.id}>
                        <TableCell align="center">ID:{pizza.id} | Quantity:{pizza.quantity}</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    //comes with MUI collapsible table template (altered)
    //helper function that formats the data for the table

    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      orderTime: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      pizzas: PropTypes.arrayOf(
        PropTypes.shape({
        }),
      ).isRequired
    }).isRequired,
  };
  

export default DataTable;