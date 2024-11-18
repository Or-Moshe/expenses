const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses } = require('../controllers/mongo');

router.post('/storeExpenses', getExpensesDetails, storeExpenses);


// Export the router
module.exports = router; 