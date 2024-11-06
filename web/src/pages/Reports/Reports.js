import React from 'react';
import Dashboard from '../Dashboard/Dashboard';

const Reports = () =>{


    return (
        <div>
            <div>
                <Dashboard header="הוצאות חני"/>
            </div>
            <div>
                <Dashboard header="הוצאות אור"/>
            </div>
            <div>
                <Dashboard header="הוצאות בית"/>
            </div>
        </div>
    );
}


export default Reports;