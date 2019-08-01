require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.get('/user', (req, res) => {
  // res.send('Hi there!!');
  // res.json({
  //   name: 'Edwin Garcia',
  //   message: 'Hello Edwin',
  // });
  // res.json('Edwing123');
  res.json('get user');
});

app.post('/user', (req, res) => {
  // res.json('post user');
  let body  = req.body;
  if (body.name === undefined) {
    res.status(400).json({
      ok: false,
      message: 'name is required',
    });
  } else {
    res.json({
      body
    });
  };
});

app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  res.json({
    id,
    
  });
});

app.delete('/user', (req, res) => {
  res.json('delete user');
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`on localhost:${port}`);
});