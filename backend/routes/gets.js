const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { addExpenses } = require('../controllers/mongo');

router.get('/getExpensesDetails', getExpensesDetails, addExpenses);

// Export the router
module.exports = router; 