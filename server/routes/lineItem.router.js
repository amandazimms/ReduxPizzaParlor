const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all orders that have been placed, populate with data from the pizza collection
router.get('/', (req, res) => {
    // Find all orders and return them
    pool.query('SELECT * FROM "line_item";').then((result) => {
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