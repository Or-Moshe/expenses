// manage the shared expense data
import React, { createContext, useContext, useState } from 'react';

const ExpenseContext = createContext();

//This component provides expenses and addExpense functions to any child component.
export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
  
    const addExpense = (newExpense) => {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      console.log('expenses',expenses);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense }}>
          {children}
        </ExpenseContext.Provider>
    );    
}

//A custom hook to access expenses and addExpense from any component.
export function useExpense() {
    return useContext(ExpenseContext);
}

