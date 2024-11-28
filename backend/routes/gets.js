const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses, getExpensesForProfileList } = require('../controllers/mongo');
const { handleGetCategories, handleGetUsers} = require('../handlers/handler');

router.get('/getExpensesDetails', getExpensesDetails, storeExpenses);
router.get('/getExpensesForProfileList', getExpensesForProfileList);
router.get('/getCategories', handleGetCategories);
router.get('/getUsers', handleGetUsers);
// Export the router
module.exports = router; 