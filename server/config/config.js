// PORT
process.env.PORT = process.env.PORT || 3000;


// node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// database
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost/super-coffee';
} else {
  urlDB = 'mongodb+srv://Edwing123:5AEJIv2bLc3tlUQU@cluster0-pobs9.mongodb.net/test'
};

// enviroment connection url
process.env.DB_URL = urlDB;