const expect = require('chai').expect;
const faker = require('faker');
const App = require('../models/app');

describe('App Model', () => {
    // Test for all Apps
  it('Gets All', (done) => {
    App.findAll(
        (err) => {
          throw new Error(err);
        },
        (apps) => {
          this.testApps = apps;
          expect(this.testApps.length).to.be.above(0);
          done();
        }
    );
  });

    // Add a App
  it('Adds a new App', (done) => {
        // Generate a fake App with a random title
    const fakeApp = { title: faker.name.firstName() };

        // Call app model for adding
    App.create(fakeApp,
        (err) => {
          throw new Error(err);
        },
        (app) => {
            // Save the returned data for later use in tests
          this.tempApp = app.dataValues;

            // App.title returned from model should match app.title supplied
          expect(app.title).to.be.equal(fakeApp.title);
          done();
        }
    );
  });

    // Find an App
  it('Find an App', (done) => {
        // Generate a fake App with a random title
    const targetApp = this.testApps[0];

        // Call app model for finding
    App.findById(targetApp,
        (err) => {
          throw new Error(err);
        },
        (app) => {
            // App.title returned from model should match app.title supplied
          expect(app.title).to.be.equal(targetApp.title);
          done();
        }
    );
  });

    // Update a App
  it('Update a App', (done) => {
        // Load in the info for an existing app
    const updateApp = this.tempApp;

        // Generate a new title for hte app
    updateApp.title = 'Not A Real Name';

        // Call app model for updating
    App.update(updateApp,
        (err) => {
          throw new Error(err);
        },
        (app) => {
            // Save the returned data for later use in tests
          this.tempApp = app;
            // App.title returned from model should match app.title supplied
          expect(app.title).to.be.equal(updateApp.title);
          done();
        }
    );
  });

    // Remove a App
  it('Remove a App', (done) => {
        // Load in the info for an existing app
    const removeApp = this.tempApp;
    removeApp.force = true;

        // Call app model for updating
    App.destroy(removeApp,
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
