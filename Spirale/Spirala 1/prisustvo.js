class Prisustvo
{
    static trenutnaSedmica;
    prisustvo;
    finalnoStanje;
    constructor()
    {
        Prisustvo.trenutnaSedmica=1;
        this.prisustvo=0;
        this.finalnoStanje=false;
    }
    izracunajPrisustvo(sedmica, listaPrisustva)
    {
        var pamtinijeuneseno=false;
        var ukupno_prisutan=0;
        var ukupno_odsutan=0;
        if(Number.isInteger(sedmica)==false || sedmica<1 || sedmica>15)
        {
            return {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"};
        }
        if(Prisustvo.trenutnaSedmica<sedmica)
        {
            return {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"};
        }
        for (let i = 0; i < listaPrisustva.length; i++)
        {
            var pamticontinue=false;
            for(let j=i;j<listaPrisustva.length;j++)
            {
                if(listaPrisustva[j].prSedmica==listaPrisustva[i].prSedmica && j!=i)
                {
                    pamticontinue=true;
                }
            }
            if(pamticontinue==true)
            {
                continue;
            }
            if ((Object.hasOwn(listaPrisustva[i], 'prSedmica'))==false)
            {
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};
            }
            if ((Object.hasOwn(listaPrisustva[i], 'prisutan'))==false)
            {
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};
            }
            if ((Object.hasOwn(listaPrisustva[i], 'odsutan'))==false)
            {
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};
            }
            if ((Object.hasOwn(listaPrisustva[i], 'nijeUneseno'))==false)
            {
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};
            }
            var names="[";
            var greska=false;
            if (listaPrisustva[i].prSedmica<1 || listaPrisustva[i].prSedmica>15)
            {
                names+=Object.keys(listaPrisustva[i])[0];
                greska=true;
            }
            if (listaPrisustva[i].prisutan<0 || listaPrisustva[i].prisutan>8)
            {
                if(greska==true)
                {
                    names+=",";
                }
                names+=Object.keys(listaPrisustva[i])[1];
                greska=true;
            }
            if (listaPrisustva[i].odsutan<0 || listaPrisustva[i].odsutan>8)
            {
                if(greska==true)
                {
                    names+=",";
                }
                names+=Object.keys(listaPrisustva[i])[2];
                greska=true;
            }
            if (listaPrisustva[i].nijeUneseno<0 || listaPrisustva[i].odsutan>8)
            {
                if(greska==true)
                {
                    names+=",";
                }
                names+=Object.keys(listaPrisustva[i])[3];
            }
            names+="]";
            if(greska==true)
            {
                return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties " + names + "!"}
            }
            if(listaPrisustva[i].prisutan+listaPrisustva[i].odsutan+listaPrisustva[i].nijeUneseno>8)
            {
                return {greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"};
            }
            if(listaPrisustva[i].nijeUneseno!=0)
            {
                pamtinijeuneseno=true;
            }
            ukupno_prisutan+=listaPrisustva[i].prisutan;
            ukupno_odsutan+=listaPrisustva[i].odsutan;
        }
        this.prisustvo = ((ukupno_prisutan)*1.00) / ((ukupno_prisutan + ukupno_odsutan)*1.00) * 100;
        if(pamtinijeuneseno==false)
        {
            this.finalnoStanje=true;
        }
        var pamtiindeks=-1;
        for (let i = 0; i < listaPrisustva.length; i++)
        {
            var pamticontinue=false;
            if(listaPrisustva[i].prSedmica==sedmica)
            {
                pamtiindeks=i;
                for(let j=i;j<listaPrisustva.length;j++)
                {
                    if(listaPrisustva[j].prSedmica==listaPrisustva[i].prSedmica && j!=i && listaPrisustva[j].prSedmica==sedmica)
                    {
                        pamticontinue=true;
                    }
                }
                if(pamticontinue==true)
                {
                    continue;
                }
            }
        }
        if(pamtiindeks==-1)
        {
            return {prisustvoZaSedmicu: sedmica, prisutan: pamtiindeks, odsutan: pamtiindeks, nijeUneseno: pamtiindeks}
        }
        return {prisustvoZaSedmicu: sedmica, prisutan: listaPrisustva[pamtiindeks].prisutan, odsutan: listaPrisustva[pamtiindeks].odsutan, nijeUneseno: listaPrisustva[pamtiindeks].nijeUneseno}
    }
}

//let pr = new Prisustvo();
//Prisustvo.trenutnaSedmica = 7;

// pogresan parametar sedmica
//const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
//console.log(pr.izracunajPrisustvo(16, lista)); // treba vratiti {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"}
//console.log(pr.izracunajPrisustvo(10, lista)); // treba vratiti {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"}

//const lista = [{ prSedmica: 1, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
//console.log(pr.izracunajPrisustvo(3, lista)); // treba vratiti { greska: 'Parametar listaPrisustva nema ispravne properties!' }

// pogresan parametar listaPrisustva
// const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
// console.log(pr.izracunajPrisustvo(2, lista1)); // treba vratiti {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!"}

//const lista2 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
//POGLEDAJ , objasnjeno na piazzi, moze i ova verzija 
//console.log(pr.izracunajPrisustvo(2, lista2)); // treba vratiti {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 4 za properties [prSedmica,prisutan,odsutan,nijeUneseno]!"}

//const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }]
//console.log(pr.izracunajPrisustvo(1, lista)); // Poziv metode treba vratiti objekat {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!"}

//const lista = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }]
//console.log(pr.izracunajPrisustvo(1, lista)); // Ne treba da vraca gresku

//const lista = [{prSedmica: 2, prisutan: 2, odsutn: 2, nijeUneseno: 3}, {prSedmica: 2, odsutan: 1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }]
//console.log(pr.izracunajPrisustvo(20, lista)); // Treba vratiti {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"}

//const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 },{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }]
//console.log(pr.izracunajPrisustvo(2, lista)); // Treba vratiti { prisustvoZaSedmicu: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }
//console.log(pr.izracunajPrisustvo(5, lista)); // Treba vratiti {prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1}

// ispravna lista
//const lista3 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
//console.log(pr.izracunajPrisustvo(2, lista3)); // lista je ispravna i treba vratiti {prisustvoZaSedmicu: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0}
//console.log(pr.izracunajPrisustvo(5, lista3)); // lista je ispravna ali sedmica ne postoji u listi tako da treba vratiti {prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1}

//const lista = [{ prSedmica: 1, prisutan: 4, odsutan: 4, nijeUneseno: 0 }, { prSedmica: 2, prisutan: 3, odsutan: 3, nijeUneseno: 1 }, { prSedmica: 3, prisutan: 2, odsutan: 2, nijeUneseno: 3 }];
//pr.izracunajPrisustvo(2, lista)
//console.log(pr.prisustvo);
