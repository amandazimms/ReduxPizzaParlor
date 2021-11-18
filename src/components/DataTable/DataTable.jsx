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
import { Button } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Stack from '@mui/material/Stack';


//DataTable is a sleek MUI table
function DataTable() {

    const orders = useSelector( store=>store.orders );

    const [rows, setRows]=useState([]); //orders get stored as 'rows' for the purpose of mui stuff below
    const [pizzasOnThisOrder, setPizzasOnThisOrder]=useState([]); 
    const [show, setShow] = useState(false);

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


    const showOrderDetails = (id) => {
      //function that takes in an order ID and makes an axios call to do some SQL joins, 
      //to ultimately display a list of pizzas belonging to each customer order

      let thisOrdersPizzas = []
        axios.get(`/api/lineItem/${id}`).then ( ( response )=>{
          dispatch({type: 'SET_LINE_ITEMS', payload: response.data});
          setPizzasOnThisOrder(response.data);
          setShow(true);
        }).catch( ( err )=>{
          console.log( err );
        alert( 'problem!' );
        }) 

    }

  return (
    <div>
    
      {show ? 
      <Alert show={show} severity="info" align="center" dismissible>
        <AlertTitle  align="left">This Customer's Order Details:</AlertTitle>
        {pizzasOnThisOrder.map((pizza) => (
              <p>{pizza.name}</p>
            ))}
        <div className="alert-close-button">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
        </div> 
      </Alert>
      :
      <p></p>
      }
      

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
             {/* Table TITLES */}
              <TableCell><h3>Name</h3></TableCell>
              <TableCell align="right"><h3>Time Order Placed</h3></TableCell>
              <TableCell align="right"><h3>Type</h3></TableCell>
              <TableCell align="right"><h3>Cost</h3></TableCell>
              <TableCell/>
              {/* ^ Empty cell to go above our buttons */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* Table CELLS that contain our data (passed from orders to rows) */}
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.orderTime}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right"><Button onClick={() => showOrderDetails(row.id)}>Details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}


export default DataTable;
