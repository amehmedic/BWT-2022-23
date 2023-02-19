let http = require('http');
let fs = require('fs');
let url = require('url');
let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("./knjige.js");

let should = require("chai").should();
chai.use(chaiHttp);

describe('testiranje GET na /', function () {
    beforeEach(function (done) {
        fs = require('fs');
        fs.writeFile('knjige.txt', 'Pro Git,33,meki uvez,4.16', function () {
        });
        done();
    });
    afterEach(function (done) {
        delete require.cache[require.resolve('fs')];
        done()
    });
    it('GET / ce dohvatiti sve knjige', function (done) {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200); //odgovor treba imati status 200
                res.body.should.be.a('array'); //u odgovoru treba biti neki niz

                res.body.length.should.be.eql(1); //duzina odgovora treba biti 1 
                done();
            });
    });
});

describe('testiranje POST na /', function () {
    beforeEach(function (done) {
        fs = require('fs');
        fs.writeFile('knjige.txt', 'Pro Git,33,meki uvez,4.16', function () {
        });
        done();
    });
    afterEach(function (done) {
        delete require.cache[require.resolve('fs')];
        done()
    });
    it('POST / ce dodati novu knjigu', function (done) {
        let knjiga = {
            naslov: 'From Mathematics to Generic Programming',
            cijena: 42,
            tip: 'eKnjiga',
            ocjena: 4.15
        }
        chai.request(server)
            .post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(knjiga)
            .end(function (err, res) {
                res.should.have.status(200); //odgovor treba imati status 200
                should.not.exist(err); //ne bi trebalo biti gresaka
                done();
            });
    });
});

describe('testiranje DELETE na /', function ()
{
    beforeEach(function (done)
    {
        fs = require('fs');
        fs.writeFile('knjige.txt', 'Pro Git,33,meki uvez,4.16', function () {
        });
        done();
    });
    afterEach(function (done)
    {
        delete require.cache[require.resolve('fs')];
        done()
    });
    it('DELETE / ce obrisati sve knjige', function (done)
    {
        chai.request(server)
            .delete('/')
            .end((err, res) =>
            {
                res.should.have.status(200); //odgovor treba imati status 200
                should.not.exist(err); //ne bi trebalo biti gresaka
                done();
            });
    });
});

describe('testiranje PUT na /', function ()
{
    beforeEach(function (done) {
        fs = require('fs');
        fs.writeFile('knjige.txt', 'Pro Git,33,meki uvez,4.16', function ()
        {
        });
        done();
    });
    afterEach(function (done)
    {
        delete require.cache[require.resolve('fs')];
        done()
    });
    it('PUT / ce promijeniti sve knjige', function (done)
    {
        chai.request(server)
            .put('/')
            .send({naslov: 'Nova knjiga', cijena: 15, tip: 'eKnjiga', ocjena: '5.0'})
            .end((err, res) =>
            {
                res.should.have.status(200); //odgovor treba imati status 200
                should.not.exist(err); //ne bi trebalo biti gresaka
                done();
            });
    });
});