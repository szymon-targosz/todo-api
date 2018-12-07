const mongoose = require('mongoose');

if(process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}

mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }); 

module.exports = { mongoose };