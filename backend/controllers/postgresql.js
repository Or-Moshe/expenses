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
  } finally {
    //await pool.end();
  }
};

module.exports = {
    getCategories, 
    getUsers,
    saveCategoriesGoals
}