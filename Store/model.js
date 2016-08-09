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