const mongoose = require('mongoose');


function connectDB() { 
  // connect to mongodb
  // user: Edwing123
  // password: 5AEJIv2bLc3tlUQU
  // url: mongodb+srv://Edwing123:5AEJIv2bLc3tlUQU@cluster0-pobs9.mongodb.net/test
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useCreateIndex: true, });
  const connection = mongoose.connection;
  connection.on('error', () => {
    console.log('Error when connecting to db');
  });

  connection.once('open', () => {
    console.log('connected to database');
  });
};


// exporting db function
module.exports = {
  connectDB,
};