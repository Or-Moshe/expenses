import React, {useState} from 'react';
import SearchableDropdown from '../../components/SearchableDropdown/SearchableDropdown';
import PacmanLoader from "react-spinners/PacmanLoader";
import expensesCategories from '../../data/expensesCategories';
import { storeExpenses } from '../../callouts/server';
import { useExpense } from './ExpenseContext';
import "./AddExpense.css";

const profiles = [{ id: 1, name: "Or" }, { id: 2, name: "Hani" },];

const AddExpense = () => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Select option...');
  const [expenseMessage, setExpenseMessage] = useState('');
  const [profile, setProfile] = useState('');
  const [expenseDetails, setExpenseDetails] = useState([]);
  

  const [loading, setLoading] = useState(false);
  const { addExpense } = useExpense();


  const handleAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected Value:", category);
    setExpenseCategory(category);
  };

  const handleProfileChange = (profile) => {
    console.log("Selected profile:", profile);
    setProfile(profile);
  };

  const handleExpenseMessageChange = (event) => {
    setExpenseMessage(event.target.value);
  };

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    const expense = {"amount": expenseAmount, "category": expenseCategory};
    if(expense){
      const result = await storeExpenses({"profile": profile, message: expenseMessage});
      console.log(result);
      // console.log(expenses);
      // if(expenses){
      //   setExpenseDetails(expenses);
      //   expenses.forEach((expense) => {
          
      //     addExpense(expense);
      //   });
      //}

      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Add Expense</h1>
      <p>Welcome to your AddExpense!</p>
      <form onSubmit={handleSubmit}>
        
      <div className="form-group">
          <label htmlFor="profile">Name:</label>
          <SearchableDropdown 
            options={profiles}
            placeholder="Search profiles"
            label="name"
            id="id"
            handleChange={handleProfileChange}
            className="dropdown"
          />
        </div>

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

        <div className="loading">
          <PacmanLoader 
            size="25"
            color="#344feb"
            loading={loading}
            speedMultiplier="0.5"/>
        </div>
      </form>


    </div>


  );
};

export default AddExpense;
