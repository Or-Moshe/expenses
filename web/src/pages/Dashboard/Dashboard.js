import React from 'react';
import Chart from 'react-apexcharts';

const Dashboard = () => {

  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: false, // Set to false for grouped columns
    },
    xaxis: {
      categories: ['Category 1', 'Category 2', 'Category 3'], // Categories for the x-axis
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
      name: 'Series 1',
      data: [10, 20, 30], // Data points for each category
    },
    {
      name: 'Series 2',
      data: [15, 25, 35], // Data points for each category
    },
    {
      name: 'Series 3',
      data: [5, 10, 15], // Data points for each category
    },
  ];


  return (
    <div className='container'>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <Chart options={chartOptions} series={series} type="bar" height={400} />

    </div>
  );
};

export default Dashboard;
