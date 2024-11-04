import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="custom-sidebar">
      <h2>Home Economics</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/add-expense">Add Expense</Link>
          </li>
          <li>
            <Link to="/budgets">Budgets</Link>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
          </li>
          <li>
            <Link to="/savings-goals">Savings Goals</Link>
          </li>
          <li>
            <Link to="/shared-expenses">Shared Expenses</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
