const axios = require('axios');
const { ServerError } = require('../models/CustomError');

exports.getExpensesDetailsFromApi = async (inputText, res, next) => {
  try {
      const headers = {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
      };

      /*const payload = {
          model: "gpt-4o-mini",
          messages: [
              {
                  role: "user",
                  content: `Please provide the categories and prices from the following sentence as plain JSON data without markdown or code block formatting: ${inputText}`
              }
          ]
      };*/
      const payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a highly intelligent assistant specialized in extracting structured information from text. Your task is to analyze a given text and extract expense details such as category and price in JSON format. Each entry should include the category name in plural and the corresponding price, formatted as a plain JSON array."
            },
            {
                "role": "user",
                "content": `Here is the input text: '${inputText}.' Please extract the expenses into JSON format.`
            }
        ],
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        "stop": null
    }
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });

    // Validate response from OpenAI
    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
        throw new ServerError("The OpenAI API response is empty or invalid.", 502);
    }

    const result = response.data.choices[0].message.content;
    console.log('result: ', result);

    // Safely parse JSON result
    let extractedResult;
    try {
        extractedResult = JSON.parse(result.substring(result.indexOf("["), result.lastIndexOf("]") + 1));
    } catch (parseError) {
        throw new ServerError("Failed to parse JSON from OpenAI response. Ensure the response format is correct.", 500);
    }
    return extractedResult;
  } catch (error) {
      throw new ServerError(error.message || "An unexpected error occurred. Please try again later.");
  }
};