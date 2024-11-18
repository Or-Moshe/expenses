const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { addExpenses, getExpensesForProfileList } = require('../controllers/mongo');

router.get('/getExpensesDetails', getExpensesDetails, addExpenses);
router.get('/getExpensesForProfileList', getExpensesForProfileList);

// Export the router
module.exports = router; 