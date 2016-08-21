const chai = require('chai');
const request = require('supertest');
const App = require('../models/app');
const faker = require('faker');

describe('User Routes', () => {
  /* eslint no-var: 0 */
  var server;
  /* eslint no-undef: 0 */
  beforeEach(() => { // reconfigure server before each test to isolate them
    server = require('../index');
  });
  afterEach(() => {
    server.close();
  });

    // Test Get all, for Multiple Users
  it('GET /api/v1/users returns multiple users', (done) => {
      request(server)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          const users = res.body;

            // Save one single user from the list to test on in later tests
          this.user = users[0];

          chai.expect(users.length).to.be.above(0);
        })
        .end(done);
  });

    // Test getById for a single user
  it('GET /api/v1/users/:id returns an user obj with a id and name property', (done) => {
    request(server)
        .get('/api/v1/users/' + this.user.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          const user = res.body;
          chai.expect(user).to.have.property('id');
          chai.expect(user).to.have.property('name');
        })
        .end(done);
  });

    // Test getAllByUserId for the Apps of a Specific user
  it('GET /api/v1/users/:id/apps should find all apps for a user', (done) => {
    const newApp = { title: 'Best New Test App', description: 'none', userID: this.user.id };

    App.create(newApp, () => {

    }, () => {
      request(server)
                .get('/api/v1/users/' + this.user.id + '/apps')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect((res) => {
                  const apps = res.body;
                  chai.expect(apps.length).to.be.above(0);
                })
                .end(done);
    });
  });
  // Test insert new
  it('POST /api/v1/users creates new user', (done) => {
      // Generate a fake User with a random name
      const fakeUser = { name: faker.name.firstName() };
      request(server)
          .post('/api/v1/users')
          .set('Accept', 'application/json')
          .send(fakeUser)
          .expect('Content-Type', /json/)
          .expect((res) => {
              const user = res.body;
              // Save user to test on in later tests
              this.tempUser = user;
              chai.expect(user.name).to.be.equal(fakeUser.name);
          })
          .end(done);
  });
  // Test update existing
  it('PUT /api/v1/users/:id updates existing user', (done) => {
      // get previously created user
      const updateUser = this.tempUser;
      updateUser.name = faker.name.firstName();
      request(server)
          .put('/api/v1/users/' + updateUser.id)
          .set('Accept', 'application/json')
          .send(updateUser)
          .expect('Content-Type', /json/)
          .expect((res) => {
              const user = res.body;
              // Save user to test on in later tests
              this.tempUser = user;
              chai.expect(user.name).to.be.equal(updateUser.name);
          })
          .end(done);
  });
  // Test update existing
  it('DELETE /api/v1/users/:id deletes existing user', (done) => {
      request(server)
          .delete('/api/v1/users/' + this.tempUser.id)
          .expect('Content-Type', /json/)
          .expect((data) => {
              chai.expect(data.res.statusCode).to.be.equal(200);
              chai.expect(data.res.body.response).to.be.equal(1);
          })
          .end(done);
  });
});
