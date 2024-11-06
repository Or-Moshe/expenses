import axios from 'axios';

const analyzeText = async() => {
    const headers = {
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