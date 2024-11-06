import axios from 'axios';

const analyzeText = async() => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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" 
    };
    const body = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "write only the type of the expense and the amout from this sentence: the expenses fron this sentence: yesterday i bought a shirt in 200 shekels. today i was at a restaurant and i ate hamburgar cost 70 shekels."}]
    };
    axios.post('https://api.openai.com/v1/chat/completions', body, {headers})
      .then(response => {
        console.log(response.data);
        return response.data
      })
      .catch(error => {
        console.error(error);
        return error;
      });
};

export default analyzeText;