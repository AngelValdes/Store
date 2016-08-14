// ORM UnitOfWork
// npm i --save-dev dotenv to support environment variables, then make .env with values
// npm i --save sequelize
// npm i --save mysql

const Sequelize = require('sequelize');
require('dotenv').config();
const logger = require('../services/logger');
// configure connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_SCHEMA,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    timestamps: false, // true by default
  },
});
const user = sequelize.define('user', { // define user model
  name: Sequelize.STRING,
});
const app = sequelize.define('app', { // define app model
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  releaseDate: Sequelize.DATE,
},
  {
    timestamps: true,
  });
const artAsset = sequelize.define('artAsset', { // define artAsset model
  title: Sequelize.STRING,
  srcLink: Sequelize.STRING,
});

// define model relationships
user.hasMany(app, { foreignKey: 'userId' });
app.belongsTo(user);
app.hasMany(artAsset, { foreignKey: 'appId' });

sequelize.sync()
    .then(() => {
      logger.debug('All models are synchronized\n', 0);
    })
    .catch((error) => {
      logger.debug('Model synchronization error: ' + error + '\n', 2);
    });

exports.sequelize = sequelize;
exports.user = user;
exports.app = app;
exports.artAsset = artAsset;


// testConnection: function() { //test connection
//    sequelize
//        .authenticate()
//        .then(function () {
//            Logger.debug("Connection has been established successfully.\n", 0);
//        })
//        .catch(function (err) {
//            Logger.debug("Unable to connect to the database:", err + "\n");
//        });
// },

/* Other examples of queries
sequelize.query("UPDATE users SET y = 42 WHERE x = 12").spread(function(results, metadata) {
  // Results will be an empty array and metadata will contain the number of affected rows.
})

sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
  .then(function(users) {
    // We don't need spread here, since only the results will be returned for select queries
})

// Callee is the model definition. This allows you to easily map a query to a predefined model
sequelize.query('SELECT * FROM projects', { model: Projects }).then(function(projects){
  // Each record will now be a instance of Project
})

sequelize.query('SELECT * FROM projects WHERE status = ?',
  { replacements: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT * FROM projects WHERE status = :status ',
  { replacements: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM
projects WHERE status = $1',
  { bind: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM
 projects WHERE status = $status',
  { bind: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})
*/
