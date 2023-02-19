let broj = 20;
let istina = true;
let rijec = 'Proba';
let niz = ['Sarajevo', 'Tuzla', 'Mostar', 'Zenica'];
let objekat = {
    knjige: ['Pro Git', 'From Mathematics to Generic Programming', 'Managing Data Using Excel', 'The Elements of Style'],
    cijene: [11, 33, 42, 45]
};

let expect = require('chai').expect;
describe('Zadatak 1', () => 
{
    it('postoji varijabla broj', () =>
    {
        expect(broj).to.be.a('number');
    });
    it('varijabla broj ima vrijednost 20', () =>
    {
        expect(broj).to.eql(20);
    });
    it('varijabla istina ima vrijednost true', () =>
    {
        expect(istina).to.eql(true);
    });
    it('varijabla rijec je tipa string', () =>
    {
        expect(rijec).to.be.a('string');
    });
    it('varijabla rijec ima dužinu 5', () =>
    {
        expect(rijec).to.have.lengthOf(5);
    });
    it('varijabla niz nije prazna', () => {
        expect(niz).to.be.an('array').that.is.not.empty;
    });
    it('varijabla niz sadrži članove „Sarajevo“ i „Mostar“', () =>
    {
        expect(niz).to.include('Sarajevo', 'Mostar');
    });
    it('varijabla niz ima dužinu barem 4,', () =>
    {
        expect(niz).to.have.lengthOf(4);
    });
    it('varijabla objekat u sebi sadrži niz knjige dužine 4', () =>
    {
        expect(objekat).to.have.property('knjige').with.length(4);
    });
    it('varijabla cijene unutar objekta objekat je sortirani niz', () =>
    {
        expect(objekat).to.have.property('cijene').to.include.ordered.members([11, 33, 42, 45]);
    });
});

// Razlika je sto equal prolazi samo ako poredimo dva ista objekta