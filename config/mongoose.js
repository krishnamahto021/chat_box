const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/chat_box_db');
const db = mongoose.connection;
db.on('error',console.error.bind('error in connecting database'));
db.once('open',function(){
    console.log('Successfully connected to database');
});

module.exports =db;
