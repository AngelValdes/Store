//ORM
//load dependency module
var Sequelize = require('sequelize');
//configure connection to database
var sequelize = new Sequelize("store", 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
    logging: function () { },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false // true by default
    }
});
var Users;
var Applications;
var ArtAssets;
module.exports = {
    testConnection: function() { //test connection
        sequelize
            .authenticate()
            .then(function () {
                console.log('Connection has been established successfully.');
            })
            .catch(function (err) {
                console.log('Unable to connect to the database:', err);
            });
    },
    define: function() { //define model
        Users = sequelize.define('users', {
            name: Sequelize.STRING
        });
        //define applications model
        Applications = sequelize.define('applications', {
            title: Sequelize.STRING,
            description: Sequelize.TEXT,
            releaseDate: Sequelize.DATE
        },
            {
                timestamps: true
            });
        //define artAssets model
        ArtAssets = sequelize.define('artAssets', {
            title: Sequelize.STRING,
            srcLink: Sequelize.STRING
        });
        //define model relationships based on Json example
        Users.hasMany(Applications); 
        Applications.belongsTo(Users);
        Applications.hasMany(ArtAssets);
    },
    sync: function () { //synchronize model
        sequelize.sync();
    },
    Users: function() { //expose model
        return Users;
    },
    Applications: function () { //expose model
        return Applications;
    },
    ArtAssets: function () { //expose model
        return ArtAssets;
    }

};

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

sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $1',
  { bind: ['active'], type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})

sequelize.query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status',
  { bind: { status: 'active' }, type: sequelize.QueryTypes.SELECT }
).then(function(projects) {
  console.log(projects)
})
*/