global.DEBUG = true; //  define running environment at a global scope

const express = require('express'); // configure web sever
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();  // instantiate application

app.use(bodyParser.json()); // to get json from req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes')(express)); // initialize routes

const logger = require('./services/logger');


module.exports = app.listen(port,
() => logger.debug('Sever Active on:' + port, 0)); // initialize server, exception to rule.

