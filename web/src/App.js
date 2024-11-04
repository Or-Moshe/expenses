// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.js';
import Dashboard from './pages/Dashboard/Dashboard.js'; // Create a Dashboard component
import AddExpense from './pages/AddExpense/AddExpense.js'; // Create an AddExpense component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
          <div className="sidebar-layout">
            <Sidebar />
          </div>
          <div className="content-layout">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
          </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
