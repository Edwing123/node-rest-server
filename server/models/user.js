// javascript file to create user model


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// get Schema methods | class ... not sure about it
const Schema = mongoose.Schema;


// valid roles
let validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'
};


// define user Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required!!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(uniqueValidator, { message: '{VALUE} already exists' });


// export model
module.exports = mongoose.model('user', userSchema);