const mongoose = require('mongoose');

const connectDb = async() => {
  try {
    const connect = await mongoose.connect('mongodb://localhost:27017/my-contacts')
    console.log('Connected to database');

  }
  catch (err) {
    console.log(err);
    process.exit();
  }
}

module.exports = connectDb;