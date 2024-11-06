import React, {useState} from 'react';
import SearchableDropdown from '../../components/SearchableDropdown/SearchableDropdown';
import expensesCategories from '../../data/expensesCategories';
import analyzeText from "../../apis/openai";

import { useExpense } from './ExpenseContext';

import "./AddExpense.css";
console.log(expensesCategories);

const AddExpense = () => {
  
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Select option...');
  const [expenseMessage, setExpenseMessage] = useState('');

  const { addExpense } = useExpense();

  const handleAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected Value:", category);
    setExpenseCategory(category);
  };

  const handleExpenseMessageChange = (event) => {
    setExpenseMessage(event.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(expenseMessage){
      await analyzeText();
    }
    const expense = {"amount": expenseAmount, "category": expenseCategory};
    if(expense){
      addExpense(expense);
      
    }
  };


  return (
    <div className="container">
      <h1>Add Expense</h1>
      <p>Welcome to your AddExpense!</p>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="expenseAmount">Amount:</label>
          <input
            type="number"
            id="expenseAmount-id"
            value={expenseAmount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expenseCategory">Category:</label>
          <SearchableDropdown 
            options={expensesCategories}
            placeholder="Search categories"
            label="name"
            id="id"
            handleChange={handleCategoryChange}
            className="dropdown"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expenseMessage">Details:</label>
          <textarea
            id="expenseMessage-id"
            value={expenseMessage}
            onChange={handleExpenseMessageChange}
            placeholder="Enter expense details..."
            className="textarea-field"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Add Expense</button>
      </form>
    </div>


  );
};

export default AddExpense;
