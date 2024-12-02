const { getCategories, getUsers, saveCategoriesGoals, getExpenses } = require('../controllers/postgresql');

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

const handleGetExpenses = async(req, res) => {
    try {
        const result = await getExpenses();
        res.status(200).json({ message: 'fetched successfully', data: result });
    } catch (error) {
        res.status(200).json({ message: 'fetched failed', error: error });
    }
}

module.exports = {
    handleGetCategories,
    handleGetUsers,
    handleSaveCategoriesGoals,
    handleGetExpenses
}