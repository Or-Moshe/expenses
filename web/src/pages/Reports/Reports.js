import React, { useEffect, useState, useRef } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { getExpenses } from '../../callouts/server';

const Reports = () => {
    const [categories, setCategories] = useState([]); // Default empty array
    const [series, setSeries] = useState([]);         // Default empty array
    const [isLoaded, setIsLoaded] = useState(false);  // Track loading state
    const isFirstRender = useRef(true);               // Prevent double effect

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log("I only run once (When the component gets mounted)");
            getExpensesData();
        }
    }, []);

    const getExpensesData = async () => {
        try {
            setIsLoaded(false); // Start loading
            const result = await getExpenses();
            console.log('result ', result);

            if (result?.data?.all_categories) {
                // Extract and map expenses data to series
                const expenses = result.data.expenses;
                const categories = result.data.all_categories;
                const series = Object.values(expenses).map(user => ({
                    name: `${user.user_name}`,
                    data: user.categories.map(cat => parseFloat(cat.total_spent)), // Convert to numbers
                }));
                series.push({
                    name: 'יעד',
                    data: categories.map(cat => cat.category_goal), // Data points for each category
                });

                // Update state
                setCategories(result.data.all_categories);
                setSeries(series);
            }
        } catch (error) {
            console.error('Error fetching expenses data:', error);
        }
        finally{
            setIsLoaded(true);
        }
    };

    return (
        <div>
            {!isLoaded && <div>Loading...</div>} {/* Graceful loading state */}
            {isLoaded && categories.length > 0 && series.length > 0 && ( // Render only when data is ready
                <>
                    <div>
                        <Dashboard header="הוצאות פרטיות" categories={categories} series={series} />
                    </div>
                    {/* Uncomment below for additional dashboards */}
                    {/* <div>
                        <Dashboard header="הוצאות בית" categories={categories} series={series} />
                    </div> */}
                </>
            )}
        </div>
    );
};

export default Reports;
