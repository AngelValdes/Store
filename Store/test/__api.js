// npm install -g mocha chai -> will install a testing framework.
// looks for a test folder with test files
// add js file with test example
// run "mocha" in console window in application context
// additional functionality can be added with module 'expect' -> npm i expect --save-dev
// to test APIs supertest is good, -> npm i supertest --save-dev

const assert = require('assert');
const expect = require('expect'); // it is built in supertest
/* eslint no-var: 0 */
var server;
const request = require('supertest'); // override request

describe('test example', () => {
  describe('test method', () => {
    it('assert & expect', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
      expect('testValue').toBe('testValue');
    });
  });
});

describe('API', () => {
  /* eslint no-undef: 0 */
  beforeEach(() => { // reconfigure server before each test to isolate them
    server = require('../index');
  });
  afterEach(() => {
    server.close();
  });
  it('/ Website running', (done) => {
    request(server)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(200, done);
  });
  it('/status route should return healthy: true', (done) => {
    request(server)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, { healthy: true }, done);
  });
});
