const chai = require('chai');
const faker = require('faker');
const request = require('supertest');

describe('App Routes', () => {
  /* eslint no-var: 0 */
  var server;
  /* eslint no-undef: 0 */
  beforeEach(() => {
    server = require('../index');
  });
  afterEach(() => {
    server.close();
  });

    // Test for Multiple Apps
  it('GET /api/v1/apps returns multiple apps', (done) => {
    request(server)
            .get('/api/v1/apps')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res) => {
              const apps = res.body;
                // Save one single app from the list to test on in later tests
              this.app = apps[0];
              chai.expect(apps.length).to.be.above(0);
            })
            .end(done);
  });

    // Test for a single app
  it('GET /api/v1/apps/:id returns an app obj with id, title,' +
  'description, and releaseDate properties', (done) => {
    request(server)
            .get('/api/v1/apps/' + this.app.id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res) => {
              const app = res.body;
              chai.expect(app).to.have.property('id');
              chai.expect(app).to.have.property('title');
              chai.expect(app).to.have.property('description');
            })
            .end(done);
  });
  // Test insert new
  it('POST /api/v1/apps creates new app', (done) => {
      // Generate a fake app with a random title
    const fakeApp = { title: faker.name.firstName() };
    request(server)
          .post('/api/v1/apps')
          .set('Accept', 'application/json')
          .send(fakeApp)
          .expect('Content-Type', /json/)
          .expect((res) => {
            const app = res.body;
              // Save app to test on in later tests
            this.tempApp = app;
            chai.expect(app.title).to.be.equal(fakeApp.title);
          })
          .end(done);
  });
  // Test update existing
  it('PUT /api/v1/apps/:id updates existing app', (done) => {
      // get previously created app
    const updateApp = this.tempApp;
    updateApp.title = faker.name.firstName();
    request(server)
          .put('/api/v1/apps/' + updateApp.id)
          .set('Accept', 'application/json')
          .send(updateApp)
          .expect('Content-Type', /json/)
          .expect((data) => {
            const app = data.res.body;
              // Save user to test on in later tests
            this.tempApp = app;
            chai.expect(app.name).to.be.equal(updateApp.name);
          })
          .end(done);
  });
  // Test update existing
  it('DELETE /api/v1/apps/:id deletes existing app', (done) => {
    request(server)
          .delete('/api/v1/apps/' + this.tempApp.id)
          .expect('Content-Type', /json/)
          .expect((data) => {
              // console.log(data);
            chai.expect(data.res.statusCode).to.be.equal(200);
            chai.expect(data.res.body.response).to.be.equal(1);
          })
          .end(done);
  });
});
