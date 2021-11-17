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
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';

//DataTable is a sleek MUI collapsible table
function DataTable() {
    const orders = useSelector( store=>store.orders );
   // const pizzas = useSelector( store=>store.pizzas );
   // const lineItems = useSelector( store=>store.lineItems );

    const [rows, setRows]=useState([]); //orders get stored as 'rows' for the purpose of rendering in the MUI components below
    const dispatch = useDispatch();

    useEffect(()=>{ 
      getOrders();
    }, []);

    const getOrders = () => {
      axios.get('/api/order').then ( ( response )=>{
        dispatch({type: 'SET_ORDERS', payload: response.data});
        
        formatOrders(response.data);//<--if this is called here (my first instinct), DOM & formatOrders gets the orders, but findPizzasOnOrder starts with empty lineItems and pizzas
      }).catch( ( err )=>{
        console.log( err );
        alert( 'problem!' );
      }) 
    } 

    function formatOrders(_orders){
      //function that takes in orders (from orders store) and formats them the way we need them for display on the admin page

      let formattedOrders = [];
      for(const order of _orders){
          formattedOrders.push({
            id: order.id,
            name: order.customer_name,
            orderTime: order.time,
            type: order.type,
            cost: '$'+order.total,
            //pizzas: findPizzasOnOrder(order.id)
            pizzas: [{id: 0, quantity: 0},{id: 0,quantity: 0}] //<-placeholders because above line not fully functional
          })
          //findPizzasOnOrder(order.id);
      }
      setRows(formattedOrders);
    }


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
                <Row key={row.name} row={row}/>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    ); 
}


function Row(props) {
    // comes with MUI collapsible table template (altered)
    // helper function that makes MUI rows out of our 'rows' variable
    const dispatch = useDispatch();

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const dropdownClicked = ()=> {
      setOpen(!open); //opens or closes the dropdown menu
    }

    const showOrderDetails = () => {
      //function that takes in an order ID and makes an axios call to do some SQL joins, 
      //to ultimately display a list of pizzas belonging to each customer order

      console.log("!", row.id);

      let thisOrdersPizzas = []
        axios.get(`/api/lineItem/${row.id}`).then ( ( response )=>{
          dispatch({type: 'SET_LINE_ITEMS', payload: response.data});
          
          console.log("this order's pizzas:", response.data);
        }).catch( ( err )=>{
          console.log( err );
        alert( 'problem!' );
        }) 

    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={dropdownClicked}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>

          {/* Table CELLS that contain our data (passed from orders to rows) */}
          <TableCell component="th" scope="row">{row.name}</TableCell>
          <TableCell align="right">{row.orderTime}</TableCell>
          <TableCell align="right">{row.type}</TableCell>
          {/* <TableCell align="right">{row.cost}</TableCell> */}
           <TableCell align="right"><button onClick={showOrderDetails}>Details</button></TableCell>

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
                    <TableRow key={row.id}>
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
      cost: PropTypes.string.isRequired,
      pizzas: PropTypes.arrayOf(
        PropTypes.shape({
        }),
      ).isRequired
    }).isRequired,
  };
  

export default DataTable;