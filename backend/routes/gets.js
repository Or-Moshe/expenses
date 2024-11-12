const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');

router.get('/getExpensesDetails', getExpensesDetails);

// Export the router
module.exports = router; 