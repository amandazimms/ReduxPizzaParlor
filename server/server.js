const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
const pizzaRouter = require('./routes/pizza.router.js');
app.use('/api/pizza', pizzaRouter);

const orderRouter = require('./routes/order.router.js');
app.use('/api/order', orderRouter);

const lineItemRouter = require('./routes/lineItem.router.js');
app.use('/api/lineItem', lineItemRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});