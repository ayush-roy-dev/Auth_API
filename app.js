const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bp = require('body-parser');
const mongoose = require('mongoose');

dotenv.config()

// connect to DB
mongoose.connect('mongodb://localhost:27017/auth_api', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true}, () => console.log('Connected to DB'));

// route middlewears
app.use('/api', bp.json(), require('./routes/api/auth'));
app.use('/api', require('./routes/test'));

// middlewears


// server
const port = process.env.PORT || 3333;
app.listen(port, () => console.log('The server is listening at port ' + port));
