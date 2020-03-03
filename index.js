const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 5000;
const dbConnection = require('./db/dbConnection');
const apiRouter = require('./router/router');

dbConnection();

app.use(logger('dev'));
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log('req.url :', req.url);

  next();
});

app.use('/api', apiRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on ${port}`);
});
