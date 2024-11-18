const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const getRoutes = require('./routes/gets');
const postRoutes = require('./routes/posts');

require('dotenv').config();
const app = express();

//connceting to mongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {console.log("DB connnected");});
mongoose.connection.on("error", err => {console.error(`DB conncetion error: ${err}`);});

app.use(cors()); // This enables CORS for all origins. Adjust as necessary for production.
app.use(bodyParser.json()); // This allows you to parse JSON body data.
app.use('/', getRoutes);
app.use('/', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
