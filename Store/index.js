global.DEBUG = true; //  define running environment at a global scope
global.LOGPATH = './logs/logfile.log'; // location of log files

const express = require('express'); // configure web sever
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();  // instantiate application

app.use(bodyParser.json()); // to get json from req body
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', require('./routes')(express)); // initialize routes

//const logger = require("simple-logger-pkg");

module.exports = app.listen(port, () => {
    //logger.debug('Sever Active on:' + port, 0);
    console.log("server active");
}); // initialize server, exception to rule.

