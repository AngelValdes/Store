//npm install -g mocha chai -> will install a testing framework. looks for a test folder with test files
//add js file with test example
//run "mocha" in console window in application context
//additional functionality can be added with module 'expect' -> npm i expect --save-dev
//to test APIs supertest is good, -> npm i supertest --save-dev
"use strict";
const assert = require('assert');
const expect = require('expect'); //it is built in supertest
let server;
const request = require('supertest'); //override request

describe('test example', function () {
    describe('test method', function () {
        it('assert & expect', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
            expect("testValue").toBe("testValue");
        });
    });
});

describe('API', function () {   
    beforeEach(function () { //reconfigure server before each test to isolate them
        server = require('../server.js');
    });
    afterEach(function () {
        server.close();
    });
    it('/ Website running', function (done) {
        request(server)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .expect(200, "Website running...", done);
    });
    it('/status route should return healthy: true', function (done) {
        request(server)
            .get('/status')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, { "healthy": true }, done);
    });
 
});