const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses, getExpensesForProfileList } = require('../controllers/mongo');

router.get('/getExpensesDetails', getExpensesDetails, storeExpenses);
router.get('/getExpensesForProfileList', getExpensesForProfileList);

// Export the router
module.exports = router; 