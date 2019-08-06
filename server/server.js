require('./config/config');
const express = require('express');
const db = require('./db/db');
const app = express();
const bodyParser = require('body-parser');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./routes/users'));



// db connection
db.connectDB();


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`on localhost:${port}`);
});