// models/Expense.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema for individual expense entry
const expenseEntrySchema = new Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  description: { type: String }
});

// Define schema for each month containing expenses
const monthSchema = new Schema({
  month: { type: String, required: true },
  expenses: [expenseEntrySchema]
});

// Define schema for each year containing months
const yearSchema = new Schema({
  year: { type: String, required: true },
  months: [monthSchema]
});

// Define schema for each category containing years
const categorySchema = new Schema({
  category: { type: String, required: true },
  years: [yearSchema]
});

// Define main profile schema containing categories
const profileSchema = new Schema({
  categories: [categorySchema]
});

// Export only the schema (do not create a model here)
module.exports = profileSchema;
