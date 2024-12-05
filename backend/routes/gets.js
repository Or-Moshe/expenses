const express = require('express');
const router = express.Router();

const { getExpensesDetails } = require('../controllers/openai');
const { storeExpenses, getExpensesForProfileList } = require('../controllers/mongo');
const { test, handleGetWebhook, handleGetCategories, handleGetUsers, handleGetExpenses} = require('../handlers/handler');

//router.get('/getExpensesDetails', getExpensesDetails, storeExpenses);
router.get('/getExpensesForProfileList', getExpensesForProfileList);
router.get('/getCategories', handleGetCategories);
router.get('/getUsers', handleGetUsers);
//router.get('/getExpenses', handleGetExpenses);
router.get('/', test);
router.get('/webhook', handleGetWebhook);
// Export the router
module.exports = router; 