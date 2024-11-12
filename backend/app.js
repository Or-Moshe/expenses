const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const getRoutes = require('./routes/gets');

require('dotenv').config();
const app = express();

app.use(cors()); // This enables CORS for all origins. Adjust as necessary for production.
app.use(bodyParser.json()); // This allows you to parse JSON body data.
app.use('/', getRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
