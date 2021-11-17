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
  //MY QUESTIONS FOR DEV:

  //After rewatching the video from last class, I was finally able to overcome the "react runs too fast"
  //  issue and display something on the DOM whose value I had recently set. Thanks, dispatch!

  //now I have something that is a step or two more complex and I can't figure out how to make it work.

  //First I set orders, pizzas, and lineItems with dispatch. 
  //    I can see that if I console log them or display on DOM, it works - all three are filled arrays with my DB data.
  
  //Next I need to manipulate this data - reformat how 'orders' looks for display on DOM, 
  //    and also do a bit of id-comparing to be able to display the names of pizzas on each order (stretch goal)
  //    I have the logic for this in formatOrders(), which always/only takes in orders as an argument.
  
  //However, it seems that no matter where I try running formatOrders, it runs BEFORE the three stores are updated
  //    - depending where I try, lineItems and pizzas are usually still empty, and in some cases orders too.

  //So my question is, where/how can I call formatOrders() so that it runs AFTER getLineItems(), getPizzas(), 
  //    and getOrders() have already run?


    const orders = useSelector( store=>store.orders );
    const pizzas = useSelector( store=>store.pizzas );
    const lineItems = useSelector( store=>store.lineItems );

    const [rows, setRows]=useState([]); //orders get stored as 'rows' for the purpose of rendering in the MUI components below
    const dispatch = useDispatch();

    useEffect(()=>{
      getLineItems();
      getPizzas(); 
      getOrders();
      //formatOrders(orders);//<--if this is called here, formatOrders does not get the orders and neither does the DOM
      //console.log('pizzas:', pizzas, 'orders:', rows, 'lineItems:', lineItems);//<--If I run this log here, they're all empty
    }, []);

    const getLineItems = () => {
      axios.get('/api/lineItem').then ( ( response )=>{
        dispatch({type: 'SET_LINE_ITEMS', payload: response.data});
      }).catch( ( err )=>{
        console.log( err );
        alert( 'problem!' );
      }) 
    }
    const getPizzas = () => {
      axios.get('/api/pizza').then ( ( response )=>{
        dispatch({type: 'SET_PIZZAS', payload: response.data});
      }).catch( ( err )=>{
        console.log( err );
        alert( 'problem!' );
      }) 
    }
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
          name: order.customer_name,
          orderTime: order.time,
          type: order.type,
          cost: '$'+order.total,
          //pizzas: findPizzasForOrder(order.id)
          pizzas: [{id: 0, quantity: 0},{id: 0,quantity: 0}] //<-placeholders because above line not fully functional
        })
        findPizzasOnOrder(order.id);//<---when fully functional, will run this a few lines up instead (where it's now commented), but running now to check and see what's happening
      }
      setRows(formattedOrders);
    }

    //console.log('pizzas:', pizzas, 'orders:', rows, 'lineItems:', lineItems);//<--this does display with the right data inside each
    //formatOrders(orders);//<--if this is called here, this causes infinite render loop

    function findPizzasOnOrder(orderId){
      //helper function that takes in an order ID and compares it with the pizzas and lineItems tables 
      //to ultimately display a list of pizzas belonging to each customer order

      console.log('line items:', lineItems);//<---this is always empty because we get to this logic before lineItems are set
      
      let pizzaIDs = []; //will become array of numbers: the ids of all the pizzas on this order.
      for(let i=0; i<lineItems.length; i++){
        console.log('lineItem order ID:',  lineItems[i].order_id, ". our orderID:", orderId);//<--have never gotten this line to run as lineItems is always still empty when I get here
        if(lineItems[i].order_id === orderId){
          pizzaIDs.push(lineItems[i].pizza_id);
        }
      }
      let pizzaTitles = []; //will become array of words: the titles of all the pizzas on this order
      for(let i=0; i<pizzaIDs.length; i++){
        pizzaTitles.push(pizzas[ pizzaIDs[i] ].name);//todo fix?/don't repeat- this could be a dangerous way if it's possible to remove a pizza table?
      }
      
      console.log('pizzas on order no.', orderId, ':', pizzaTitles);
      //return pizzaTitles;//<--eventually we will return here, once anything works
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
                <Row key={row.name} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    ); 
}

function Row(props) {
    // comes with MUI collapsible table template (altered)
    // helper function that makes MUI rows out of our 'rows' variable

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