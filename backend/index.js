const mongoose = require('mongoose');
require('dotenv').config();
const mongoDB_uri = process.env.MONGODB_URI;

mongoose.createConnection(mongoDB_uri, { //.create였던 걸 변경.   
    useNewUrlParser: true,
    // useCreateIndex: true
    // useUnifiedTopology: true
});

const db = mongoose.connection;

module.exports = db;