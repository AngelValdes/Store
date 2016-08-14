
const expect = require('chai').expect;
const request = require('supertest');

describe('App Routes', () => {
  /* eslint no-var: 0 */
  var server;
  /* eslint no-undef: 0 */
  beforeEach(() => {
    server = require('../server');
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

              expect(apps.length).to.be.above(0);
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
              expect(app).to.have.property('id');
              expect(app).to.have.property('title');
              expect(app).to.have.property('description');
            })
            .end(done);
  });
});
