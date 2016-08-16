const express = require('express'); // configure web sever
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();  // instantiate application

app.use(bodyParser.json()); // to get json from req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes')(express)); // initialize routes

module.exports = app.listen(port, () => console.log('Sever Active on:' + port)); // initialize server

