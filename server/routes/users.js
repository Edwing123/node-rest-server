const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

// routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to users</h1>')
});
app.get('/user', (req, res) => {
  // optional params
  let fromUsers = req.query.from || 1;
  let limit = req.query.limit || 5;
  fromUsers = Number(fromUsers) - 1;
  limit = Number(limit);
  // res.send('Hi there!!');
  // res.json({
  //   name: 'Edwin Garcia',
  //   message: 'Hello Edwin',
  // });
  // res.json('Edwing123');
  // referent to User Model
  User.find({ status: true, }, 'name email role status google img')
    .skip(fromUsers)
    .limit(limit)
    .exec((err, usersDocs) => {
      if (err) return res.status(400).json({
        ok: false,
        errors: err
      });

      User.count({ status: true, }, (err, totalDocs) => {
        res.json({
          ok: true,
          totalUsers: totalDocs,
          users: usersDocs,
        });
      });
    });
});

app.post('/user', (req, res) => {
  // res.json('post user');
  let body  = req.body;

  // creating a user from User model
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        popUp: 'bad luck',
        error: err,
      });
    }

    // hidden or setting to null user's password
    // userDB.password = null;

    const userResp = _.pick(userDB, ['name', 'email', '_id', 'google', 'status', 'role'])
    res.json({
      ok: true,
      user: userResp,
    });
    console.log('user created');
  });
});

app.put('/user/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['name', 'email', 'status', 'role']);

  // using model to query data based on the model (collection)

  // #1 method, findById
  // User.findById(id, (err, databaseUser) => {
  //   if (err) return res.send('error');

  //   // so we can make changes like if databaseUser would be another document
  //   for (let key of Object.keys(body)) {
  //     databaseUser[key] = body[key];
  //   };
  //   databaseUser.save((err, userDB) => {
  //     if (err) return res.send('error');
  //     console.log(userDB);
  //     res.send(userDB)
  //   });
  // });

  // #2 method findByIdAndUpdate
  User.findByIdAndUpdate(id, { $set: body }, {
    new: true,
    runValidators: true,
  }, (err, userDoc) => {
    if (err) return res.status(400).json({
      ok: false,
      errors: err,
    });

    // if all fine => there's such user with that id
    res.json({
      ok: true,
      userDoc,
    });
  });
});

app.delete('/user/:id', (req, res) => {
  let id = req.params.id;

  // delete it total
  User.findByIdAndUpdate(id, { $set: { status: false, } }, (err, desactivatedUser) => {
    if (err) return res.status(400).json({
      ok: false,
      errors: err,
    });
    if ( !desactivatedUser ) {
      return res.json({
        ok: false,
        errors: {
          message: 'user not found',
        }
      })
    }

    res.json({
      ok: true,
      desactivatedUser,
    });
  });
});


// exports routes
module.exports = app;