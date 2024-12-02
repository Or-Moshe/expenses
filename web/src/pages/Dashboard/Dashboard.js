import React from 'react';
import Chart from 'react-apexcharts';
import styles from'./Dashboard.module.css';


const Dashboard = ({ header, categories, series }) => {
    if (!categories || !series) {
        return <div>No data available</div>;
    }

    // Chart options
    const chartOptions = {
        chart: {
            type: 'bar',
        },
        title: {
            text: header,
            align: 'center',
        },
        xaxis: {
            categories: categories.map(cat => cat.category_name), // Use category names for the x-axis
        },
        yaxis: {
            title: {
                text: 'Total Spent',
            },
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            y: {
                formatter: (val) => `$${val.toFixed(2)}`, // Format tooltip values
            },
        },
    };

    return (
      <div className={styles.container}>
      <h1>{header}</h1>
      <p>Welcome to your dashboard!</p>
        <Chart options={chartOptions} series={series} type="bar" height={400} />
    </div>
    );
};

export default Dashboard;
