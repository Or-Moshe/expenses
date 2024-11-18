import axios from 'axios';

export const getExpenseDetails = async(message) => {
    try {
        const response = await axios.get('http://localhost:3001/getExpensesDetails', {
            params: { message } 
        });
        const jsonString = response.data.slice(response.data.indexOf('['), response.data.indexOf(']') + 1);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('There was an error!', error);
        throw error; 
    }
};

export const getExpensesForProfileList = async(message) => {
    try {
        const response = await axios.get('http://localhost:3001/getExpensesForProfileList', {
            params: ['Hani', 'Or'] 
        });
        console.log(response);
        if(response.status !== 200){
            throw response.statusText; 
        }
        return response.data;
    } catch (error) {
        console.error('There was an error!', error);
        throw error; 
    }
};