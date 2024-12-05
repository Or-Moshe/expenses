const { getCategories, getUsers, saveCategoriesGoals, getExpenses, insertCategories } = require('../controllers/postgresql');
const { getExpensesDetailsFromApi } = require('../controllers/openai');

const test = async(req, res) => {
    try {
        console.log("hello");
        res.status(200).json({ message: 'hello' });
    } catch (error) {
        res.status(200).json({ message: 'fetched failed', error: error });
    }
}
const handleGetWebhook = async(req, res) => {
    try {
        const verifyToken = "12345";
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        
        console.log('mode ' , mode);
        console.log('token ' , token);
        console.log('challenge ' , challenge);

        if (mode && token === verifyToken) {
            if (mode === 'subscribe') {
                console.log('Webhook verified');
                res.status(200).send(challenge);
            }
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        res.status(200).json({ message: 'fetched failed', error: error });
    }
}

const handleGetCategories = async(req, res) => {
    try {
        const result = await getCategories();
        res.status(200).json({ message: 'fetched successfully', data: result });
    } catch (error) {
        res.status(200).json({ message: 'fetched failed', error: error });
    }
}

const handleGetUsers = async(req, res) => {
    try {
        const result = await getUsers();
        res.status(200).json({ message: 'fetched successfully', data: result });
    } catch (error) {
        res.status(200).json({ message: 'fetched failed', error: error });
    }
}

const handleSaveCategoriesGoals = async(req, res) => {
    try {
        const categories = req.body.categories;
        const result = await saveCategoriesGoals(categories);
        res.status(200).json({ message: 'Saved Categories Goals successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Saved Categories Goals failed', error: error.message, statusCode: error.status });
    }
}

const handleStoreExpenses = async(req, res) => {
    try {
        if (!req.body || !req.body.message) {
            throw new ClientError("Request body is missing or invalid. 'message' is required.", 400);
        }
        /*const extractedResult = await getExpensesDetailsFromApi(req.body.message);
        if(extractedResult){
            const categories = extractedResult.map((ex) => ex.category);
            console.log('categories', categories);
            insertCategories(categories);
        }*/
        const insertedCategoriesRes = insertCategories([ 'groceries', 'transportation', 'dining out']);
        res.status(200).json({ message: 'fetched successfully', data: insertedCategoriesRes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'fetched failed', error: error });
    }
}

const storeExpenses = async (req, res) => {
    try {
        getExpensesDetails();
    } catch (error) {
        
    }
}

module.exports = {
    test,
    handleGetWebhook,
    handleGetCategories,
    handleGetUsers,
    handleSaveCategoriesGoals,
    handleStoreExpenses
}