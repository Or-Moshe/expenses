import React, {useState} from 'react';
import SearchableDropdown from '../../components/SearchableDropdown/SearchableDropdown';

import "./AddExpense.css";

const AddExpense = () => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Select option...');
  const [expenseMessage, setExpenseMessage] = useState('');

  const options = [
    { id: 1, name: "Graspus graspus" },
    { id: 2, name: "Grus rubicundus" },
    { id: 3, name: "Speothos vanaticus" },
    { id: 4, name: "Charadrius tricollaris" },
];

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



  return (
    <div className="container">
      <h1>AddExpense</h1>
      <p>Welcome to your AddExpense!</p>
      <form>

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
          />
        </div>

        <div className="form-group">
          <SearchableDropdown 
              options={options}
              placeholder="Search"
              label="name"
              id="id"
              handleChange={handleCategoryChange}
              />
        </div>

        <textarea
          id="expenseMessage-id"
          value={expenseMessage}
          onChange={handleExpenseMessageChange}
          placeholder='Enter expense details...'>
        </textarea>

        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>

    </div>
  );
};

export default AddExpense;
