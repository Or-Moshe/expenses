import React from 'react';
import Chart from 'react-apexcharts';
import { useExpense } from '../AddExpense/ExpenseContext';
import expensesCategories from '../../data/expensesCategories';
import styles from'./Dashboard.module.css';

const Dashboard = ({header}) => {

  const { expenses } = useExpense();

  console.log(expensesCategories);
  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false, // Set to false for grouped columns
    },
    xaxis: {
      categories: expensesCategories.map((category) => category.name), // Categories for the x-axis
    },
    plotOptions: {
      bar: {
        columnWidth: '45%', // Adjust the width of each column
      },
    },
    colors: ['#1E90FF', '#FF6347', '#32CD32'], // Colors for each series
    legend: {
      position: 'top',
    },
  };

  const series = [
    {
      name: 'Series אור',
      data: [10, 20, 30], // Data points for each category
    },
    {
      name: 'Series חני',
      data: [15, 25, 35], // Data points for each category
    },
    {
      name: 'Series יעד',
      data: [5, 10, 15], // Data points for each category
    },
  ];


  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <p>Welcome to your dashboard!</p>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.category} - {expense.amount}
          </li>
        ))}
      </ul>
      <Chart options={chartOptions} series={series} type="bar" height={400} />

    </div>
  );
};

export default Dashboard;
