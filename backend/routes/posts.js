const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses } = require('../controllers/mongo');
const { handleSaveCategoriesGoals } = require('../handlers/handler');

router.post('/storeExpenses', getExpensesDetails, storeExpenses);
router.post('/saveCategoriesGoals', handleSaveCategoriesGoals);

// Export the router
module.exports = router; 