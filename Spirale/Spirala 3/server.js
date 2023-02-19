const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const Predmet = require('./scripts/predmet.js');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.text());
app.use(express.static('scripts'));

app.post('/student/', function(req,res) 
{
    const tijelo = req.body;
    let imep = tijelo['ime'];
    let prezimep = tijelo['prezime'];
    let indexp = tijelo['index'];
    let object =
    {
        status: null
    };
    fs.readFile('studenti.csv', 'UTF-8', (err, izfajla) =>
    {
        if(err)
        {
            throw err;
        }
        let strings = izfajla.split('\n');
        for(let i=1;i<strings.length;i++)
        {
            let stringici = strings[i].split(',');
            if(stringici[2]==indexp)
            {
                object.status="Student sa indexom " + indexp + " vec postoji!";
                return res.status(400).send(object);
            }
        }
        let zapisi = '\n' + imep + ',' + prezimep + ',' + indexp;
        fs.writeFile('studenti.csv',zapisi, { flag: 'a+' }, (err) =>
        {
            if(err)
            {
                throw err;
            }
            object.status="Kreiran student!";
            res.json(object);
        })
    });
});

app.post('/predmet', function(req,res) 
{
    const tijelo = req.body;
    let nazivp = tijelo['naziv'];
    let kodp = tijelo['kod'];
    let object =
    {
        status: null
    };
    fs.readFile('predmeti.csv', 'UTF-8', (err, izfajla) =>
    {
        if(err)
        {
            throw err;
        }
        let strings = izfajla.split('\n');
        for(let i=1;i<strings.length;i++)
        {
            let stringici = strings[i].split(',');
            if(stringici[1]==kodp)
            {
                object.status="Predmet sa kodom " + kodp + " vec postoji!";
                return res.status(400).send(object);
            }
        }
        let predmet= new Predmet;
        if(predmet.provjeriKodPredmeta(kodp)==false)
        {
            
            object.status="Kod predmeta nije ispravan!";
            return res.status(400).send(object);
        }
        let zapisi = '\n' + nazivp + ',' + kodp;
        fs.writeFile('predmeti.csv', zapisi, { flag: 'a+' }, (err) =>
        {
            object.status="Kreiran predmet!";
            res.send(object);
        })
    });
});

app.post('/prisustvo/', function(req,res) 
{
    let imagreska=false;
    const tijelo = req.body;
    let tipCasap = tijelo['tipCasa'];
    let redniBrojCasap = tijelo['redniBrojCasa'];
    let sedmicap = tijelo['sedmica'];
    let kodPredmetap = tijelo['kodPredmeta'];
    let indexStudentap = tijelo['indexStudenta'];
    let statusPrisustvap = tijelo['statusPrisustva'];
    let object =
    {
        status: null
    };
    if(statusPrisustvap!='prisutan' && statusPrisustvap!='odsutan' && statusPrisustvap!='nijeUneseno')
    {
        object.status="Status prisustva nije ispravan!";
        return res.status(400).send(object);
    }
    fs.readFile('predmeti.csv', 'UTF-8', (err, izfajla) =>
    {
        if(err)
        {
            throw err;
        }
        let nepostoji=true;
        let strings = izfajla.split('\n');
        for(let i=1;i<strings.length;i++)
        {
            let stringici = strings[i].split(',');
            if(stringici[1]==kodPredmetap)
            {
                nepostoji=false;
                break;
            }
        }
        if(nepostoji==true)
        {
            object.status="Kod predmeta ne postoji!";
            imagreska=true;
            return res.status(400).send(object);
        }
        fs.readFile('studenti.csv', 'UTF-8', (err, izfajla) =>
        {
            if(err)
            {
                throw err;
            }
            let nepostoji=true;
            let strings = izfajla.split('\n');
            for(let i=1;i<strings.length;i++)
            {
                let stringici = strings[i].split(',');
                if(stringici[2]==indexStudentap)
                {
                    nepostoji=false;
                    break;
                }
            }
            if(nepostoji==true)
            {
                object.status="Student ne postoji!";
                imagreska=true;
                return res.status(400).send(object);
            }
            fs.readFile('prisustva.csv', 'UTF-8', (err, izfajla) =>
            {
                if(err)
                {
                    throw err;
                }
                let nepostoji=true;
                let pamti;
                let strings = izfajla.split('\n');
                for(let i=1;i<strings.length;i++)
                {
                    let stringici = strings[i].split(',');
                    if(stringici[0]==tipCasap && stringici[1]==redniBrojCasap && stringici[2]==sedmicap && stringici[3]==kodPredmetap && stringici[4]==indexStudentap)
                    {
                        nepostoji=false;
                        pamti=stringici[5];
                        break;
                    }
                }
                if(nepostoji==false && imagreska==false)
                {
                    let regex = new RegExp(tipCasap+','+redniBrojCasap+','+sedmicap+','+kodPredmetap+','+indexStudentap+','+pamti, 'g');
                    let novi=(tipCasap+','+redniBrojCasap+','+sedmicap+','+kodPredmetap+','+indexStudentap+','+statusPrisustvap)
                    novidata=izfajla.replace(regex, novi);
                    fs.writeFile('prisustva.csv', novidata, (err) =>
                    {
                        if(err)
                        {
                            throw err;
                        }
                        object.status="Azurirano prisustvo!";
                        return res.send(object);
                    })
                }
                else if(nepostoji==true && imagreska==false)
                {
                    let zapisi = '\n' + tipCasap + ',' + redniBrojCasap + ',' + sedmicap + ',' + kodPredmetap + ',' + indexStudentap + ',' + statusPrisustvap;
                    fs.writeFile('prisustva.csv', zapisi, { flag: 'a+' }, (err) =>
                    {
                        object.status="Kreirano prisustvo!";
                        return res.send(object);
                    })
                }
            });
        })
    })
});

app.get('/prisustvo', function (req,res)
{
    puniurl = req.url;
    let regex = /(?<=kodPredmeta=).*(?=&index)/; // Regex da izvadimo kodPredmeta
    let kodPredmeta = puniurl.match(regex)[0];
    regex = /(?<=indexStudenta=).*(?=&sedmica)/; // Regex da izvadimo indexStudenta
    let indexStudenta = puniurl.match(regex)[0];
    regex = /(?<=sedmica=).*(?=)/; // Regex da izvadimo sedmica
    let sedmica = puniurl.match(regex)[0];
    fs.readFile('prisustva.csv', 'UTF-8', (err, izfajla) =>
    {
        if(err)
        {
            throw err;
        }
        let pamtiprisutan=0;
        let pamtiodsutan=0;
        let pamtinijeuneseno=0;
        let nepostoji=true;
        let strings = izfajla.split('\n');
        for(let i=1;i<strings.length;i++)
        {
            let stringici = strings[i].split(',');
            if(stringici[2]==sedmica && stringici[3]==kodPredmeta && stringici[4]==indexStudenta)
            {
                nepostoji=false;
                if(stringici[5]=='prisutan')
                {
                    pamtiprisutan++;
                }
                if(stringici[5]=='odsutan')
                {
                    pamtiodsutan++;
                }
                if(stringici[5]=='nijeUneseno')
                {
                    pamtinijeuneseno++;
                }
            }
        }
        if(nepostoji==true)
        {
            let object =
            {
                status: null
            };
            object.status="Prisustvo ne postoji!";
            return res.status(400).send(object);
        }
        if(nepostoji==false)
        {
            let object =
            {
                prisustvoZaSedmicu: sedmica,
                prisutan: pamtiprisutan,
                odsutan: pamtiodsutan,
                nijeUneseno: pamtinijeuneseno
            };
            res.send(object);
        }
    });
});
app.listen(8080);
module.exports = app;