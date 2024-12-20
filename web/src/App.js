// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Sidebar from './components/Sidebar/Sidebar.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import AddExpense from './pages/AddExpense/AddExpense.js'; 
import CategoriesGoals from './pages/CategoriesGoals/CategoriesGoals.js'; 
import Reports from './pages/Reports/Reports.js'; // Create an AddExpense component
import { ExpenseProvider } from './pages/AddExpense/ExpenseContext.js';
import "./App.css";


function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="app-layout">
            <div className="sidebar-layout">
              <Sidebar />
            </div>
            <div className="content-layout">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/set-goals" element={<CategoriesGoals />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
            </div>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
