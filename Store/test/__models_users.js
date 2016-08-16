const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const User = require('../models/user');

describe('User Model', () => {
    var server;
    var testUsers;
    var tempUser;


    // Test for all Users
    it('Gets All', (done) => {
        User.findAll(
            (err) => {
                throw new Error(err);
            },
            (users) => {
                this.testUsers = users;
                expect(this.testUsers.length).to.be.above(0);
                done();
            }
        );
    });

    // Add a User
    it('Adds a new User', (done) => {

        // Generate a fake User with a random name
        const fakeUser = { name: faker.name.firstName() };

        // Call user model for adding
        User.create(fakeUser,
            (err) => {
                throw new Error(err);
            },
            (user) => {

                // Save the returned data for later use in tests
                this.tempUser = user.dataValues;

                // User.name returned from model should match user.name supplied
                expect(user.name).to.be.equal(fakeUser.name);
                done();
            }
        );
    });

    // Find a User
    it('Find a User', (done) => {

        // Generate a fake User with a random name
        const targetUser = this.testUsers[0];

        // Call user model for finding
        User.findById(targetUser,
            (err) => {
                throw new Error(err);
            },
            (user) => {

                // User.name returned from model should match user.name supplied
                expect(user.name).to.be.equal(targetUser.name);
                done();
            }
        );
    });

    // Update a User
    it('Update a User', (done) => {

        // Load in the info for an existing user
        var updateUser = this.tempUser;

        // Generate a new name for hte user
        updateUser.name = 'Not A Real Name';

        // Call user model for updating
        User.update(updateUser,
            (err) => {
                throw new Error(err);
            },
            (user) => {
                // Save the returned data for later use in tests
                this.tempUser = user;
                // User.name returned from model should match user.name supplied
                expect(user.name).to.be.equal(updateUser.name);
                done();
            }
        );
    });

    // Remove a User
    it('Remove a User', (done) => {

        // Load in the info for an existing user
        var removeUser = this.tempUser;
        removeUser.force = true;

        // Call user model for updating
        User.destroy(removeUser,
            (err) => {
                throw new Error(err);
            },
            (response) => {

                // if successfully removed a 1 should be returned
                expect(response).to.be.equal(1);
                done();
            }
        );
    });

});