const mongoose =  require('mongoose');
const profileSchema = require('../models/Expense');

const { profileId, expenses } = {
    "profileId": "Or",
    "expenses": [
      {
        "category": "Groceries",
        "date": "2024-01-01",
        "amount": 50,
        "description": "Supermarket"
      },
      {
        "category": "Utilities",
        "date": "2024-01-10",
        "amount": 100,
        "description": "Electricity Bill"
      },
      {
        "category": "Groceries",
        "date": "2024-02-01",
        "amount": 30,
        "description": "Farmers Market"
      },
      {
        "category": "food",
        "date": "2024-01-15",
        "amount": 20,
        "description": "Bus fare"
      }
    ]
  };
exports.storeExpenses = async (req, res) => {
   
    try {
      
      const payload = req.expensesDetails;
      console.log("payload ", payload);
      //Creates a model dynamically with the name of the profileId, linking it to the collection named profileId.
      //Uses the profileSchema to define the structure of documents within this collection
      const ProfileModel = mongoose.model(payload.profile, profileSchema, payload.profile);
  
      // Find or create the profile document for this profileId
      let profile = await ProfileModel.findOne();
  
      // If the profile document does not exist, create it
      if (!profile) {
        profile = new ProfileModel({ categories: [] });
      }
  
      // Loop through each expense in the expenses array
      for (let expense of expenses) {
        const { category, date, amount, description } = expense;
  
        // Extract year and month from the date
        const expenseDate = new Date(date);
        const year = expenseDate.getFullYear().toString();
        const month = expenseDate.toLocaleString('default', { month: 'long' });
        
        // Find or create the category in the profile
        let categoryObj = profile.categories.find(cat => cat.category === category);
        if (!categoryObj) {
          categoryObj = { category, years: [] };
          profile.categories.push(categoryObj);
        }
  
        // Find or create the year in the category
        let yearObj = categoryObj.years.find(yr => yr.year === year);
        if (!yearObj) {
          yearObj = { year, months: [] };
          categoryObj.years.push(yearObj);
        }
  
        // Find or create the month in the year
        let monthObj = yearObj.months.find(mn => mn.month === month);
        if (!monthObj) {
          monthObj = { month, expenses: [] };
          yearObj.months.push(monthObj);
        }
  
        // Add the new expense to the month
        monthObj.expenses.push({ date, amount, description });
      }
  
      // Save the profile with updated data
      await profile.save();
  
      res.status(200).json({ message: 'Expenses added successfully' });
    } catch (error) {
      console.error("Error adding expenses:", error);
      res.status(500).json({ message: error.message });
    }
};

exports.getExpensesForProfileList = async (req, res) => {
  const profileIds  = ['Hani', 'Or']//req.body; // Array of profileIds

  try {
    // Prepare an array of promises for fetching data from each profile collection
    const fetchExpensesPromises = profileIds.map(profileId => {
      const ProfileModel = mongoose.model(profileId, profileSchema, profileId);
      return ProfileModel.findOne().then(profileData => ({ profileId, data: profileData }));
    });

    // Run all queries in parallel
    const selectedExpenses = await Promise.all(fetchExpensesPromises);

    // Filter out any null results if a profile doesn’t exist
    const filteredExpenses = selectedExpenses.filter(expense => expense.data !== null);

    res.status(200).json(filteredExpenses);
  } catch (error) {
    console.error("Error fetching expenses for specified profiles:", error);
    res.status(500).json({ message: 'Error fetching expenses for specified profiles' });
  }
};
