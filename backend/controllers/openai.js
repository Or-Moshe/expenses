const axios = require('axios');

exports.getExpensesDetails = async (req, res) => {
    console.log('getExpensesDetails', req);
    const headers = {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
    };
    const content = `Please provide the categories and prices from the following sentence as plain JSON data without markdown or code block formatting: ${req.query.message}`;
    const body = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": content}]
    };
    axios.post('https://api.openai.com/v1/chat/completions', body, {headers})
        .then(response => {
            console.log(response.data);
            if(!response.data){
                res.status(300).send("response is empty");
            }
            console.log(response.data.choices[0].message.content);
            res.json(response.data.choices[0].message.content); // Send response data as JSON
        })
        .catch(error => {
            console.error(error);
            res.status(500).send(error); // Send error response
        });
};