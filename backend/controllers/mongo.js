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
      // Destructure data from the request
      const { profile, expenses } = req.expensesDetails;
      const year = "2024"; // Replace with dynamic value if needed
      const month = "January"; // Replace with dynamic value if needed
  
      // Get or create the model for the profile
      const ProfileModel = getProfileModel(profile);
  
      // Find the profile document or create a new one
      let profileDoc = await ProfileModel.findOne();
      if (!profileDoc) {
        profileDoc = new ProfileModel({ years: [] });
      }
  
      for (let expense of expenses) {
        // Find or create the year
        let yearObj = profileDoc.years.find(yr => yr.year === year);
        if (!yearObj) {
          yearObj = { year, months: [] };
          profileDoc.years.push(yearObj);
        }
  
        // Find or create the month
        let monthObj = yearObj.months.find(mn => mn.month === month);
        if (!monthObj) {
          monthObj = { month, categories: [] };
          yearObj.months.push(monthObj);
        }
  
        // Find or create the category
        let categoryObj = monthObj.categories.find(cat => cat.category === expense.category);
        console.log('Found categoryObj:', categoryObj, 'Expense:', expense);
  
        if (!categoryObj) {
          categoryObj = { category: expense.category, expenses: [] };
          monthObj.categories.push(categoryObj);
        }
  
        // Ensure the expenses array exists
        if (!categoryObj.expenses) {
          categoryObj.expenses = [];
        }
  
        // Add the expense
        categoryObj.expenses.push({
          date: expense.date || new Date(), // Use the provided date or default to current date
          price: expense.price || expense.amount,
          currency: expense.currency || "N/A",
          item: expense.item || "Unspecified"
        });
        console.log('Updated categoryObj:', categoryObj);
      }
  
      // Save the updated profile document
      await profileDoc.markModified('years'); // Mark the `years` field as modified
      await profileDoc.save();
  
      res.status(200).json({ message: 'Expenses added successfully', data: profileDoc });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: 'Error adding expenses', error });
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
