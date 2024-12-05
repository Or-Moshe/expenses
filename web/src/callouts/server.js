import axios from 'axios';

const domain = "https://on-toad-tidy.ngrok-free.app";

export const getExpenseDetails = async(payload) => {
    try {
        const response = await axios.get(`${domain}/getExpensesDetails`, {
            params: { payload } 
        });
        const jsonString = response.data.slice(response.data.indexOf('['), response.data.indexOf(']') + 1);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('There was an error!', error);
        throw error; 
    }
};

export const getCategories = async(message) => {
    try {
        const response = await axios.get(`${domain}/getCategories`);
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

export const saveCategoriesGoals = async(categories) => {
    try {
        const response = await axios.post(`${domain}/saveCategoriesGoals`, { categories });
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

export const getExpenses = async () => {
    try {
        const response = await axios.get(`${domain}/getExpenses`);
        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status} - ${response.statusText}`);
        }
        return response.data; 
    } catch (error) {
        const errorDetails = {
            message: error.message || 'An unknown error occurred.',
            isNetworkError: !error.response, // Check if it's a network error
            status: error.response?.status || 'N/A',
            statusText: error.response?.statusText || 'N/A',
            url: error.config?.url || 'N/A',
        };

        console.error('Error fetching expenses:', errorDetails);

        // Throw the structured error object
        throw errorDetails;
    }
};

export const getExpensesForProfileList = async(message) => {
    try {
        const response = await axios.post(`${domain}/getExpensesForProfileList`, {
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

export const storeExpenses = async({profile, message}) => {
    try {
        const body = {
            "message": message,
            "profile": profile
        };
        const response = await axios.get(`${domain}/`);// await axios.post(`${domain}/storeExpenses`, body);
        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status} - ${response.statusText}`);
        }
        return response.data; 
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
};