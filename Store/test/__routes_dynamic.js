const chai = require('chai');
const request = require('supertest');
// const App = require('../models/app');
// const User = require('../models/user');
const faker = require('faker');

describe('dynamic Routes', () => {
    /* eslint no-var: 0 */
  var server;
    /* eslint no-undef: 0 */
  beforeEach(() => { // reconfigure server before each test to isolate them
    server = require('../index');
  });
  afterEach(() => {
    server.close();
  });
  const tests = [ // routes to test dinamically... it can be expanded with more routes.
    {
      resource: 'users',
      name: 'userGetAll',
      httpVerb: 'GET',
      route: '/api/v1/users',
      description: 'Gets the list of all users',
      conditions: (res) => {
        chai.expect(res.body.length).to.be.above(0);
      },
    },
    {
      resource: 'users',
      name: 'createUser',
      httpVerb: 'POST',
      route: '/api/v1/users',
      description: 'creates new user',
      conditions: (res, fake) => {
        tempData = res.body.id;
        chai.expect(res.body.name).to.be.equal(fake.name);
      },
      fake: { name: faker.name.firstName() },
    },
    {
      resource: 'apps',
      name: 'createapp',
      httpVerb: 'POST',
      route: '/api/v1/apps',
      description: 'creates new app',
      conditions: (res, fake) => {
        tempData = res.body;
        chai.expect(res.body.title).to.be.equal(fake.title);
        chai.expect(res.body).to.have.property('id');
        chai.expect(res.body).to.have.property('title');
        chai.expect(res.body).to.have.property('description');
      },
      fake: { title: faker.name.firstName(), description: 'Some new app' },
    },
    {
      resource: 'apps',
      name: 'appsGetAll',
      httpVerb: 'GET',
      route: '/api/v1/apps',
      description: 'Gets the list of all apps',
      conditions: (res) => {
        chai.expect(res.body.length).to.be.above(0);
      },
    },
  ];
  tests.forEach((test) => {
    it(test.name + ' - ' + test.description, (done) => {
      switch (test.httpVerb) {
        case 'GET':
          request(server)
                        .get(test.route)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                          test.conditions(res);
                        })
                        .end(done);
          break;
        case 'POST':
          request(server)
                        .post(test.route)
                        .set('Accept', 'application/json')
                        .send(test.fake)
                        .expect('Content-Type', /json/)
                        .expect((res) => {
                          test.conditions(res, test.fake);
                        })
                        .end(done);
          break;
        case 'PUT': // to be implemented.
          break;
        case 'DELETE': // to be implemented.
          break;
        default:
          break;
      }
    });
  });
});
