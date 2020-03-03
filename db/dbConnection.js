const mongoose = require('mongoose');

function dbConnection() {
  mongoose.connect(
    'mongodb+srv://admin:pas123456@cluster0-cd9gz.mongodb.net/db-contacts?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (err) {
        console.log(`err :`, err);
        process.exit(1);
      } else console.log(`Database connection successful`);
    },
  );
}

module.exports = dbConnection;
