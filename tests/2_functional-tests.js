const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    this.timeout(5000);

    test('Convert valid input 10L', (done) => {
        chai.request(server)
            .get('/api/convert')
            .query({input: '10L'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L');
                assert.equal(res.body.returnNum, 2.64172);
                assert.equal(res.body.returnUnit, 'gal');
                done();
            });
    });

    test('Convert invalid unit input 32g', (done) => {
        chai.request(server)
            .get('/api/convert')
            .query({input: '32g'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                assert.equal(res.body.initUnit, undefined);
                assert.equal(res.body.returnNum, undefined);
                assert.equal(res.body.returnUnit, undefined);
                done();
            });
    });

    test('Convert invalid fractional input 3/7.2/4kg', (done) => {
        chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kg'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                assert.equal(res.body.initUnit, undefined);
                assert.equal(res.body.returnNum, undefined);
                assert.equal(res.body.returnUnit, undefined);
                done();
            });
    });

    test('Convert invalid fractional and unit input 3/7.2/4kilomegagram', (done) => {
        chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
                assert.equal(res.body.initUnit, undefined);
                assert.equal(res.body.returnNum, undefined);
                assert.equal(res.body.returnUnit, undefined);
                done();
            });
    });

    test('Convert valid no number input kg', (done) => {
        chai.request(server)
            .get('/api/convert')
            .query({input: 'kg'})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg');
                assert.equal(res.body.returnNum, 2.20462);
                assert.equal(res.body.returnUnit, 'lbs');
                done();
            });
    });

});
