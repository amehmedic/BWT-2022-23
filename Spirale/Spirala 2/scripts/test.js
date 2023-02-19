let assert = chai.assert;
let expect = chai.expect;

describe('Klasa \"Prisustvo\"', function()
{
    describe('Testovi za metodu \"izracunajPrisustvo\"', function()
    {
        it('Test #1 - parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15) - sedmica ima vrijednost 123', function()
        {
            let pr = new Prisustvo();
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(123, lista);
            assert.deepEqual(test, { greska: 'Parametar sedmica nema vrijednost u rasponu od 1 do 15!' } );
        });
        it('Test #2 - parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15) - sedmica ima vrijednost -1', function()
        {
            let pr = new Prisustvo();
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(-1, lista);
            assert.deepEqual(test, { greska: 'Parametar sedmica nema vrijednost u rasponu od 1 do 15!' } );
        });
        it('Test #3 - parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica - sedmica ima vrijednost 5 a trenutnaSedmica 4', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 4;
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(5, lista);
            assert.deepEqual(test, { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" } );
        });
        it('Test #4 - parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica - sedmica ima vrijednost 3 a trenutnaSedmica 2', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 2;
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(3, lista);
            assert.deepEqual(test, { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" } );
        });
        it('Test #5 - objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo) - Nema propertya prisutan', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 10;
            const lista = [{ prSedmica: 1, odsutan: -3, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
            let test=pr.izracunajPrisustvo(4, lista)
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravne properties!" } );
        });
        it('Test #6 - objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo) - Nema propertya prisutan i prSedmica', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 12;
            const lista = [{ prSedmica: 1, odsutan: -3, nijeUneseno: 1 }, { prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
            let test=pr.izracunajPrisustvo(2, lista)
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravne properties!" } );
        });
        it('Test #7 - zbir properties prisutan, odsutan i nijeUneseno za jednu ili više sedmica je veći od 8 - Zbir properties je 9', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 1, prisutan: 4, odsutan: 4, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 0 }];
            let test=pr.izracunajPrisustvo(2, lista)
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" } );
        });
        it('Test #8 - zbir properties prisutan, odsutan i nijeUneseno za jednu ili više sedmica je veći od 8 - Zbir properties je 17', function()
        {
            let pr = new Prisustvo();
            const lista = [{  prSedmica: 5, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 4, prisutan: 8, odsutan: 8, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(1, lista)
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" } );
        });
        it('Test #9 - parametri sedmica i listaPrisustva ne ispunjavaju više uslova - sedmica ima vrijednost 17, sedmica ima vrijednost 17 a trenutnaSedmica 10, nema propertya prisutan, Zbir properties je 12', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 10;
            const lista = [{  prSedmica: 1, prisutan: 4, odsutan: 4, nijeUneseno: 4 }, { prSedmica: 2, odsutan: 0, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(17, lista)
            assert.deepEqual(test, { greska: 'Parametar sedmica nema vrijednost u rasponu od 1 do 15!' } );
        });
        it('Test #10 - parametri sedmica i listaPrisustva ne ispunjavaju više uslova - sedmica ima vrijednost 10 a trenutnaSedmica 4, nema propertya prisutan, Zbir properties je 12', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 4;
            const lista = [{  prSedmica: 5, prisutan: 4, odsutan: 4, nijeUneseno: 4 }, { prisutan: 8, odsutan: 0, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(10, lista)
            assert.deepEqual(test, { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" } );
        });
        it('Test #11 - parametri sedmica i listaPrisustva ne ispunjavaju više uslova - Nema propertya prSedmica, Zbir properties je 12', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 5;
            const lista = [{ prisutan: 4, odsutan: 0, nijeUneseno: 1 }, { prSedmica: 4, prisutan: 8, odsutan: 3, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(2, lista);
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravne properties!" } );
        });
        it('Test #12 - parametri sedmica i listaPrisustva ne ispunjavaju više uslova - Property prisutan je -1, property odsutan je -1, Zbir properties je 17', function()
        {
            let pr = new Prisustvo();
            const lista = [{  prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 4, prisutan: 8, odsutan: 8, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(1, lista);
            assert.deepEqual(test, { greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!" } );
        });
        it('Test #13 - parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica - sedmica je 2 a objekat liste koji ima najveci \"indeks\" i property prSedmica jednako 2 je { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(2, lista);
            assert.deepEqual(test, { prisustvoZaSedmicu: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 } );
        });
        it('Test #14 - parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica - sedmica je 1 a objekat liste koji ima najveci \"indeks\" i property prSedmica jednako 1 je { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 2;
            const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
            let test=pr.izracunajPrisustvo(1, lista);
            assert.deepEqual(test, { prisustvoZaSedmicu: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 } );
        });
        it('Test #15 - parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica  - sedmica je 3 a objekat liste koji ima najveci \"indeks\" i property prSedmica jednako 3 je { prSedmica: 3, prisutan: 3, odsutan: 3, nijeUneseno: 2 }', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 4;
            const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 3, odsutan: 3, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(3, lista);
            assert.deepEqual(test, { prisustvoZaSedmicu: 3, prisutan: 3, odsutan: 3, nijeUneseno: 2 } );
        });
        it('Test #16 - parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica - sedmica je 5 a objekat liste koji ima property prSedmica jednako 5 ne postoji, pa funckija vraca { prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1 }', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 7;
            const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 3, odsutan: 3, nijeUneseno: 2 }];
            let test=pr.izracunajPrisustvo(5, lista);
            assert.deepEqual(test, { prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1 } );
        });
        it('Test #17 - metoda ispravno računa vrijednost atributa prisustvo - ukupno_prisutan je 11 a ukupno_odsutan je 0 - (11/11)*100=100', function()
        {
            let pr = new Prisustvo();
            const lista = [{ prSedmica: 1, prisutan: 5, odsutan: 0, nijeUneseno: 0 }, { prSedmica: 2, prisutan: 3, odsutan: 0, nijeUneseno: 0 }, { prSedmica: 3, prisutan: 3, odsutan: 0, nijeUneseno: 0 }];
            pr.izracunajPrisustvo(1, lista)
            assert.deepEqual(pr.prisustvo, 100);
        });
        it('Test #18 - metoda ispravno računa vrijednost atributa prisustvo - ukupno_prisutan je 9 a ukupno_odsutan je 9 - (9/18)*100=50', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 2;
            const lista = [{ prSedmica: 1, prisutan: 4, odsutan: 4, nijeUneseno: 0 }, { prSedmica: 2, prisutan: 3, odsutan: 3, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 2, odsutan: 2, nijeUneseno: 3 }];
            pr.izracunajPrisustvo(2, lista)
            assert.deepEqual(pr.prisustvo, 50);
        });
        it('Test #19 - metoda ispravno računa vrijednost atributa prisustvo - ukupno_prisutan je 0 a ukupno_odsutan je 10 - (0/10)*100=0', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 1, prisutan: 0, odsutan: 4, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 0, odsutan: 4, nijeUneseno: 3 }, { prSedmica: 3, prisutan: 0, odsutan: 2, nijeUneseno: 4 }];
            pr.izracunajPrisustvo(3, lista)
            assert.deepEqual(pr.prisustvo, 0);
        });
        it('Test #20 - metoda ispravno računa vrijednost atributa prisustvo - ukupno_prisutan je 6 a ukupno_odsutan je 2 - (6/8)*100=75', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 1, prisutan: 3, odsutan: 1, nijeUneseno: 2 }, { prSedmica: 2, prisutan: 2, odsutan: 0, nijeUneseno: 3 }, { prSedmica: 3, prisutan: 1, odsutan: 1, nijeUneseno: 4 }];
            pr.izracunajPrisustvo(3, lista)
            assert.deepEqual(pr.prisustvo, 75);
        });
        it('Test #21 - Test za finalnoStanje - Svaki property nijeUneseno je 0 - finalnoStanje je true', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 0}, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 3, prisutan: 3, odsutan: 3, nijeUneseno: 0 }];
            pr.izracunajPrisustvo(3, lista)
            assert.deepEqual(pr.finalnoStanje, true);
        });
        it('Test #22 - Test za finalnoStanje - Bar jedan property nijeUneseno je razlicit od 0 - finalnoStanje je false', function()
        {
            let pr = new Prisustvo();
            Prisustvo.trenutnaSedmica = 3;
            const lista = [{ prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 0}, { prSedmica: 2, prisutan: 2, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 3, prisutan: 3, odsutan: 3, nijeUneseno: 1 }];
            pr.izracunajPrisustvo(3, lista)
            assert.deepEqual(pr.finalnoStanje, false);
        });
    });
});