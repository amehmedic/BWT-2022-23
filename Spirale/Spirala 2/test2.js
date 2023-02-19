const { afterEach } = require('node:test');
let fs = require('fs');
let http = require('http');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = require('chai').should();
var expect = chai.expect;
let server = require('./server.js');

describe('Testovi', function()
{
    describe('Testovi za Rutu POST /student {ime:string,prezime:string,index:string}', function()
    {
        beforeEach(function (done)
        {
            fs = require('fs');
            let zapis = 'ime,prezime,index\namer,mehmedic,69\nedin,dzeko,100\nsabahudin,delalic,150';
            fs.writeFile('studenti.csv', zapis, (err) => {});
            done();
        });
        afterEach(function (done)
        {
            delete require.cache[require.resolve('fs')];
            done();
        });
        it('Test #1 - Index studenta već postoji u datoteci studenti.csv', function()
        {
            let saljemo='{ime:amer,prezime:mehmedic,index:69}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                response.text.should.eql('{status:"Student sa indexom 69 vec postoji!"}');
            });
        });
        it('Test #2 - Index studenta već postoji u datoteci studenti.csv', function()
        {
            let saljemo='{ime:edin,prezime:dzeko,index:100}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                response.text.should.eql('{status:"Student sa indexom 100 vec postoji!"}');
            });
        });
        it('Test #3 - Index studenta već postoji u datoteci studenti.csv', function()
        {
            let saljemo='{ime:sabahudin,prezime:delalic,index:150}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Student sa indexom 150 vec postoji!"}');
            });
        });
        it('Test #4 - Student je uspješno kreiran', function()
        {
            let saljemo='{ime:dzenita,prezime:pendic,index:70}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran student!"}');
            });
        });
        it('Test #5 - Student je uspješno kreiran', function()
        {
            let saljemo='{ime:ludvig,prezime:va_beethon,index:1}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran student!"}');
            });
        });
        it('Test #6 - Student je uspješno kreiran', function()
        {
            let saljemo='{ime:marin,prezime:drzic,index:111}';
            chai.request(server).post('/student').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran student!"}');
            });
        });
    });
    describe('Testovi za Rutu POST /predmet {naziv:string,kod:string}', function()
    {
        beforeEach(function (done)
        {
            fs = require('fs');
            let zapis = 'naziv,kod\nMUR1,RI-RS-1-1\nIM2,RI-BoE-1-2\nASP,RI-BoE-2-1\nASP,RI-RS-2-1'
            fs.writeFile('predmeti.csv', zapis, (err) => {});
            done();
        });
        afterEach(function (done)
        {
            delete require.cache[require.resolve('fs')];
            done();
        });
        it('Test #7 - Predmet sa kodom već postoji u datoteci predmeti.csv', function()
        {
            let saljemo='{naziv:MLTI,kod:RI-BoE-1-2}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Predmet sa kodom RI-BoE-1-2 vec postoji!"}');
            });
        });
        it('Test #8 - Predmet sa kodom već postoji u datoteci predmeti.csv', function()
        {
            let saljemo='{naziv:RP,kod:RI-RS-1-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Predmet sa kodom RI-RS-1-1 vec postoji!"}');
            });
        });
        it('Test #9 - Predmet sa kodom već postoji u datoteci predmeti.csv', function()
        {
            let saljemo='{naziv:BWT,kod:RI-RS-2-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Predmet sa kodom RI-RS-2-1 vec postoji!"}');
            });
        });
        it('Test #10 - Predmet nema ispravan kod', function()
        {
            let saljemo='{naziv:BWT,kod:loskod}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kod predmeta nije ispravan!"}');
            });
        });
        it('Test #11 - Predmet nema ispravan kod', function()
        {
            let saljemo='{naziv:BWT,kod:ovonijedobarkod}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kod predmeta nije ispravan!"}');
            });
        });
        it('Test #12 - Predmet nema ispravan kod', function()
        {
            let saljemo='{naziv:BWT,kod:TK-MoE-3-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kod predmeta nije ispravan!"}');
            });
        });
        it('Test #13 - Predmet je uspješno kreiran', function()
        {
            let saljemo='{naziv:IF1,kod:TK-BoE-1-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran predmet!"}');
            });
        });
        it('Test #14 - Predmet je uspješno kreiran', function()
        {
            let saljemo='{naziv:OE,kod:AE-BoE-1-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran predmet!"}');
            });
        });
        it('Test #15 - Predmet je uspješno kreiran', function()
        {
            let saljemo='{naziv:LAG,kod:EE-BoE-1-1}';
            chai.request(server).post('/predmet').send(saljemo).end((err, response) =>
            {
                should.not.exist(err);
                response.text.should.eql('{status:"Kreiran predmet!"}');
            });
        });
    });
});