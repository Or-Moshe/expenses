const { ClientError, ServerError } = require("../models/CustomError");

const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Expenses-DB',
  password: 'Gerry2292@@',
  port: 5432, // Default PostgreSQL port
});

// Query example
const getCategories = async () => {
  try {
    const res = await pool.query('SELECT * FROM categories');
    console.log(res.rows); // Output query results
    return res.rows;
  } catch (err) {
    console.error('Database query error:', err);
  } finally {
    //await pool.end();
  }
};

const getUsers = async () => {
    try {
      const res = await pool.query('SELECT * FROM users');
      console.log(res.rows); // Output query results
      return res.rows;
    } catch (err) {
      console.error('Database query error:', err);
    } finally {
      //await pool.end();
    }
};

const saveCategoriesGoals = async (categories) => {
  try {
    //For each category object, it creates a string that matches the syntax of a SQL VALUES clause: (id, goal).
    const values = categories.map((category, index) => `(${category.id}, ${category.goal})`).join(', ');
    
    const query = `
      UPDATE categories AS c
      SET 
          goal = v.goal
      FROM (VALUES ${values}) AS v(id, goal)
      WHERE c.id = v.id
      RETURNING * ;
    `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    throw new ServerError(err);
  }
};

const getExpenses = async () => {
  try {
    const query = `
      SELECT 
          user_id,
          category_id,
        c.name AS category_name,
        c.goal AS category_goal,
        u.name AS user_name,
          COUNT(*) AS expense_count,         -- Count the number of expenses
          SUM(price) AS total_spent,         -- Total amount spent
          AVG(price) AS average_spent        -- Average amount spent
      FROM 
          expenses 
      JOIN 
        categories AS c ON expenses.category_id = c.id 
      JOIN 
        users AS u ON expenses.user_id = u.id 
      GROUP BY 
        category_id,
          user_id, 
        c.name,
        c.goal,
        u.name
      ORDER BY 
        category_id,
          user_id;
    `;
    const res = await pool.query(query);
    if(!res.rows){
      return [];
    }
    console.log('res.rows ', res.rows);
    const wrapperResult = res.rows.reduce(({expenses, all_categories}, item) => {
      // If the user_id is not yet a key, initialize it
      if (!expenses[item.user_id]) {
        expenses[item.user_id] = {
            user_id: item.user_id,
            user_name: item.user_name,
            categories: []
        }
      }
      expenses[item.user_id].categories.push({
        category_id: item.category_id,
        category_name: item.category_name,
        expense_count: item.expense_count,
        total_spent: item.total_spent,
        average_spent: item.average_spent
      });

      all_categories[item.category_id] = {
        category_id: item.category_id,
        category_name: item.category_name,
        category_goal: item.category_goal
      }; 
      return {expenses, all_categories};
    }, {"expenses": {}, "all_categories": {}});

    wrapperResult.all_categories = Object.values(wrapperResult.all_categories);
    
    return wrapperResult;
  } catch (error) {
    throw new ServerError(err);
  }
};

module.exports = {
    getCategories, 
    getUsers,
    saveCategoriesGoals,
    getExpenses
}