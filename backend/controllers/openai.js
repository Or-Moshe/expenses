const axios = require('axios');

exports.getExpensesDetails = async (req, res, next) => {
    try {
        const headers = {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        };
        console.log("*******Body:", req.body);
        const payload = {"model": "gpt-4o-mini","messages": [{"role": "user", "content": `Please provide the categories and prices from the following sentence as plain JSON data without markdown or code block formatting: ${req.body.message}`}]};
        const response = await axios.post('https://api.openai.com/v1/chat/completions',payload, { headers });
    
        if (!response.data || !response.data.choices || response.data.choices.length === 0) {
          return res.status(300).send("The response is empty or invalid.");
        }
    
        const result = response.data.choices[0].message.content;
        const exractResult = JSON.parse(result.substring(result.indexOf("["), result.lastIndexOf("]")+1));
        console.log('exractResult' , exractResult);
        if(!next){
            return res.json({ exractResult });
        }
        

        req.expensesDetails = {"profile": req.body.profile, "expenses": exractResult};
        next();
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        
        // Send a detailed error response if available, otherwise generic
        res.status(500).send(error.response?.data || "An error occurred while processing the request.");
    }
};