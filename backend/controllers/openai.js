const axios = require('axios');

exports.getExpensesDetails = async (req, res, next) => {
    try {
        const headers = {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        };
    
        const content = `Please provide the categories and prices from the following sentence as plain JSON data without markdown or code block formatting: ${req.query.message}`;
        const body = {
          "model": "gpt-4o-mini", 
          "messages": [{ "role": "user", "content": content }]
        };
    
        const response = await axios.post('https://api.openai.com/v1/chat/completions', body, { headers });
    
        if (!response.data || !response.data.choices || response.data.choices.length === 0) {
          return res.status(300).send("The response is empty or invalid.");
        }
    
        const result = response.data.choices[0].message.content;
        
        if(!next){
            return res.json({ result });
        }
        
        req.expensesDetails = response.data.choices[0].message.content;
        next();
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        
        // Send a detailed error response if available, otherwise generic
        res.status(500).send(error.response?.data || "An error occurred while processing the request.");
    }
};