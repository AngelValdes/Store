const chai = require('chai');
const request = require('supertest');
const App = require('../models/app');
const User = require('../models/user');
const faker = require('faker');

describe('dynamic Routes', () => {
  /* eslint no-var: 0 */
  var server;
  /* eslint no-undef: 0 */
  beforeEach(() => { // reconfigure server before each test to isolate them
    server = require('../server');
  });
  afterEach(() => {
    server.close();
  });
    var testRoutes = [
        { resource: "users", name: 'userGetAll', httpVerb: 'GET', route: '/api/v1/users' },
        { resource: "users", name: 'userGetById', httpVerb: 'GET', route: '/api/v1/users/:id' },
        { resource: "apps", name: 'appGetAll', httpVerb: 'GET', route: '/api/v1/apps' },
        { resource: "apps", name: 'appGetById', httpVerb: 'GET', route: '/api/v1/apps/:id' },
    ];
    // Test dynamic routes ... under construction!
  //it('GET routes', (done) => {
  //    request(server)
  //        .get(() => {
  //            for (var i = 0; i < testRoutes.length; i++) {
                  
  //            }
  //        })
  //      .set('Accept', 'application/json')        
  //      .expect((res) => {
  //      })
  //      .end(done);
  //});
    
});
