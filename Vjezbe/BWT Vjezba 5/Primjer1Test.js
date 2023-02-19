let assert = require('chai').assert;
let expect = require('chai').expect;
let should = require('chai').should()

let korisnici = {imena: ['Damir', 'Zerina', 'Edina']};
let provjera = 'Irfan';

describe('testiranje varijable provjera (assert)', function () {
    it('provjera je tipa string', function () {
        assert.typeOf(provjera, 'string');
    });
    it('provjera ima vrijednost Irfan', function () {
        assert.equal(provjera, 'Irfan');
    });
    it('provjera ima dužinu 5', function () {
        assert.lengthOf(provjera, 5);
    });
});

describe('testiranje varijable korisnici (assert)', function () {
    it('korisnici ima 3 imena', function () {
        assert.lengthOf(korisnici.imena, 3);
    });
});

describe('testiranje varijable provjera (expect)', function () {
    it('provjera je tipa string', function () {
        expect(provjera).to.be.a('string');
    });
    it('provjera ima vrijednost Irfan', function () {
        expect(provjera).to.eql('Irfan');

    });
    it('provjera ima dužinu 5', function () {
        expect(provjera).to.have.lengthOf(5);
    });
});