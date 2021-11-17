const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all orders that have been placed, populate with data from the pizza collection
router.get('/:id', (req, res) => {
    // Find all orders and return them
        pool.query('SELECT pizza.id AS pizza_id, line_item.id AS line_item_id, pizza.name FROM line_item INNER JOIN pizza ON line_item.pizza_id = pizza.id WHERE order_id=$1', 
                    [req.params.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/lineItem', error);
        res.sendStatus(500);  
    });
})



// DELETE an order
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "orders" WHERE id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /api/order', error);
        res.sendStatus(500);
    })
});

module.exports = router;