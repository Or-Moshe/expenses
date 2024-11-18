import { React, useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { getExpensesForProfileList } from '../../callouts/server';

const Reports = () =>{

    const [categories, setCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    // onMount
    useEffect(() => {
        console.log("I Only run once (When the component gets mounted)");
        getData();
    }, []);

    const getData = async () => {
        try {
            const result = await getExpensesForProfileList();
            if(!result){
                console.error("result is empty");
                return;
            }
            console.log(result);
            let categoriesData =[];
            result.forEach(element => {
                categoriesData = categoriesData.concat(element.data.categories);
            });
            const uniqueCategories = Array.from(new Set(categoriesData.map(el => el.category)));
            setCategories(uniqueCategories);
            console.log('categories', uniqueCategories);
            setIsLoaded(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            {isLoaded && (
                <>
                    <div>
                        <Dashboard header="הוצאות פרטיות" categories={categories} />
                    </div>
                    <div>
                        <Dashboard header="הוצאות בית" categories={categories} />
                    </div>
                </>
            )}
        </div> 
    );
}


export default Reports;