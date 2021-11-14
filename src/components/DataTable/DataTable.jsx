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


function DataTable() {
    // const reducerName = useSelector(store => store.reducerName);
    const orders = useSelector(store=> store.orders);

    const rows = orders;
        //todo leaving this placeholder data here for possible testing purposes later:
        // [{ 
        //     name: 'Annabel', 
        //     orderTime: '11/13 at 7:13pm', 
        //     type: 'delivery', 
        //     cost: 27.99, 
        //     pizzas: [ 
        //         {id: 1, quantity: 1}, 
        //         {id: 5, quantity: 1} 
        //     ] },
        // { name: 'Josie', orderTime: '11/13 at 6:29pm', type: 'pickup', cost: 21.99, pizzas: [ {id: 2, quantity: 1}, {id: 3, quantity: 1}, {id: 4, quantity: 1}  ] } ];

    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell/>
                {/* ^ empty cell to hold place for arrows beneath */}
                <TableCell><h3>Name</h3></TableCell>
                <TableCell align="right"><h3>Time Order Placed</h3></TableCell>
                <TableCell align="right"><h3>Type</h3></TableCell>
                <TableCell align="right"><h3>Cost</h3></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {console.log('rows:', rows)}
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
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.orderTime}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          <TableCell align="right">{row.cost}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <h4 align="center">Pizzas Ordered</h4>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.pizzas.map( (pizzah) => (
                    <TableRow key={pizzah.id}>
                        <TableCell align="center">ID:{pizzah.id} | Quantity:{pizzah.quantity}</TableCell>
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