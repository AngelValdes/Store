//npm install -g mocha chai -> will install a testing framework. looks for a test folder with test files
//add js file with test example
//run "mocha" in console window in application context
//additional functionality can be added with module 'expect' -> npm i expect --save-dev
//to test APIs supertest is good, -> npm i supertest --save-dev
var assert = require('assert');
var expect = require('expect'); //it is built in supertest
var server;
var request = require('supertest'); //override request

describe('test example', function () {
    describe('test method', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('API', function () {
    //reconfigure server before each test to isolate them
    beforeEach(function () {
        server = require('../server.js');
    });
    afterEach(function () {
        server.close();
    });
    it('/ route should return text/html', function (done) {
        expect("testValue").toBe("testValue");
        request(server)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(200, "api running...", done);
    });
    //it('/status route should return json', function (done) {
    //    request(server)
    //        .get('/api/status')
    //        .set('Accept', 'application/json')
    //        .expect('Content-Type', /json/)
    //        .expect(200, { "healthy": true }, done);
    //});
    //it('/users/id route should return user id:1 name:jon', function (done) {
    //    request(server)
    //        .get('/api/users/1')
    //        .set('Accept', 'application/json')
    //        .expect('Content-Type', /json/)
    //        .expect(200, { id: "1", name: "jon" }, done);
    //});
});