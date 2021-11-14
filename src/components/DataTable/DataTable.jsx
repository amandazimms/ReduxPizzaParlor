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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function createData(name, orderTime, type, cost, pizzas) {
  return {
    name,
    orderTime,
    type,
    cost,
    pizzas
  };
}

function Row(props) {
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
                  {row.pizzas.map((pizzaRow) => (
                    <TableRow key={pizzaRow.date}>
                      <TableCell align="center">{pizzaRow}</TableCell>
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
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderTime: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired
  }).isRequired,
};

const rows = [
  createData('Annabel', '11/13 at 7:13pm', 'delivery', 27.99, ['pepperoni', 'margherita'],),
  createData('Josie', '11/13 at 6:29pm', 'pickup', 21.99, ['supreme', 'mushroom'],),
];

export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><h3>Name</h3></TableCell>
            <TableCell align="right"><h3>Time Order Placed</h3></TableCell>
            <TableCell align="right"><h3>Type</h3></TableCell>
            <TableCell align="right"><h3>Cost</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
