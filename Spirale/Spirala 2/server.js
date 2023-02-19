const fs = require('fs');
const http = require('http');
const Predmet = require('./scripts/predmet.js');

let imagreska=false;

function handleRequest(request, response) // Pomocna funkcija, malo ljepsi interfejs
{
    var metoda = request.method;
    var ruta = request.url;
    // RUTA 1 - POST /student {ime:string,prezime:string,index:string}
    if(ruta == '/student' && metoda == 'POST')
    {
        const chunks = [];
        request.on("data", (chunk) =>
        {
            chunks.push(chunk);
        });
        request.on("end", () =>
        {
            let ulaz = Buffer.concat(chunks).toString(); // pretvori buffer u string koji izgleda ovako '{ime:string,prezime:string,index:string}'
            let podaci = ulaz.split(","); // niz ciji su elementi {'{ime:string', 'prezime:string', 'index:string}'}
            let ime = podaci[0].split(':')[1];
            let prezime = podaci[1].split(':')[1];
            let index = podaci[2].split(':')[1].split('}')[0];
            fs.readFile('studenti.csv', 'UTF-8', (err, izfajla) =>
            {
                let strings = izfajla.split('\n');
                for(let i=1;i<strings.length;i++)
                {
                    let stringici = strings[i].split(',');
                    if(stringici[2]==index)
                    {
                        response.write('{status:"Student sa indexom ' + index + ' vec postoji!"}');
                        return response.end();
                    }
                }
                let zapisi = '\n' + ime + ',' + prezime + ',' + index;
                fs.writeFile('studenti.csv', zapisi, { flag: 'a+' }, (err) =>
                {
                    response.write('{status:"Kreiran student!"}');
                    return response.end();
                })
            })
        });
    }

    // RUTA 2 - POST /predmet {naziv:string,kod:string}
    if(ruta == '/predmet' && metoda == 'POST')
    {           
        const chunks = [];
        request.on("data", (chunk) =>
        {
            chunks.push(chunk);
        });
        request.on("end", () =>
        {
            let ulaz = Buffer.concat(chunks).toString(); // pretvori buffer u string koji izgleda ovako '{naziv:string,kod:string}'
            let podaci = ulaz.split(","); // niz ciji su elementi {'{naziv:string', 'kod:string}'}
            let naziv = podaci[0].split(':')[1];
            let kod = podaci[1].split(':')[1].split('}')[0];
            fs.readFile('predmeti.csv', 'UTF-8', (err, izfajla) =>
            {
                let strings = izfajla.split('\n');
                for(let i=1;i<strings.length;i++)
                {
                    let stringici = strings[i].split(',');
                    if(stringici[1]==kod)
                    {
                        response.write('{status:"Predmet sa kodom ' + kod + ' vec postoji!"}');
                        return response.end();
                    }
                }
                let predmet= new Predmet;
                if(predmet.provjeriKodPredmeta(kod)==false)
                {
                    response.write('{status:"Kod predmeta nije ispravan!"}');
                    return response.end();
                }
                let zapisi = '\n' + naziv + ',' + kod;
                fs.writeFile('predmeti.csv', zapisi, { flag: 'a+' }, (err) =>
                {
                    response.write('{status:"Kreiran predmet!"}');
                    return response.end();
                })
            })
        });
    }
    
    // RUTA 3 POST /prisustvo {tipCasa:string,redniBrojCasa:integer,sedmica:integer,kodPredmeta:string,indexStudenta:string,statusPrisustva:string}
    if(ruta == '/prisustvo' && metoda == 'POST')
    {
        const chunks = [];
        request.on("data", (chunk) =>
        {
            chunks.push(chunk);
        });
        request.on("end", () =>
        {
            let ulaz = Buffer.concat(chunks).toString(); // pretvori buffer u string koji izgleda ovako '{tipCasa:string,redniBrojCasa:integer,sedmica:integer,kodPredmeta:string,indexStudenta:string,statusPrisustva:string}'
            let podaci = ulaz.split(","); // niz ciji su elementi {'{tipCasa:string', 'redniBrojCasa:integer', 'sedmica:integer', 'kodPredmeta:string', 'indexStudenta:string', 'statusPrisustva:string}'}
            let tipCasa = podaci[0].split(':')[1];
            let redniBrojCasa = podaci[1].split(':')[1];
            let sedmica = podaci[2].split(':')[1];
            let kodPredmeta = podaci[3].split(':')[1];
            let indexStudenta = podaci[4].split(':')[1];
            let statusPrisustva = podaci[5].split(':')[1].split('}')[0];
            if(statusPrisustva!='prisutan' && statusPrisustva!='odsutan' && statusPrisustva!='nijeUneseno') // Provjera za {status:"Status prisustva nije ispravan!"}
            {
                response.write('{status:"Status prisustva nije ispravan!"}');
                return response.end();
            }
            fs.readFile('prisustva.csv', 'UTF-8', (err, izfajla) =>
            {
                fs.readFile('predmeti.csv', 'UTF-8', (err, izfajla) => // Provjera za {status:"Kod predmeta ne postoji!"}
                {
                    let nepostoji=true;
                    let strings = izfajla.split('\n');
                    for(let i=1;i<strings.length;i++)
                    {
                        let stringici = strings[i].split(',');
                        if(stringici[1]==kodPredmeta)
                        {
                            nepostoji=false;
                            break;
                        }
                    }
                    if(nepostoji==true)
                    {
                        response.write('{status:"Kod predmeta ne postoji!"}');
                        imagreska=true;
                        return response.end();
                    }
                })
                fs.readFile('studenti.csv', 'UTF-8', (err, izfajla) => // Provjera za {status:"Student ne postoji!"}
                {
                    let nepostoji=true;
                    let strings = izfajla.split('\n');
                    for(let i=1;i<strings.length;i++)
                    {
                        let stringici = strings[i].split(',');
                        if(stringici[2]==indexStudenta)
                        {
                            nepostoji=false;
                            break;
                        }
                    }
                    if(nepostoji==true)
                    {
                        response.write('{status:"Student ne postoji!"}');
                        imagreska=true;
                        return response.end();
                    }
                })
                let nepostoji=true;
                let pamti;
                let strings = izfajla.split('\n');
                for(let i=1;i<strings.length;i++)
                {
                    let stringici = strings[i].split(',');
                    if(stringici[0]==tipCasa && stringici[1]==redniBrojCasa && stringici[2]==sedmica && stringici[3]==kodPredmeta && stringici[4]==indexStudenta)
                    {
                        nepostoji=false;
                        pamti=stringici[5];
                        break;
                    }
                }
                if(nepostoji==false && imagreska==false)
                {
                    let regex = new RegExp(tipCasa+','+redniBrojCasa+','+sedmica+','+kodPredmeta+','+indexStudenta+','+pamti, 'g');
                    let novi=(tipCasa+','+redniBrojCasa+','+sedmica+','+kodPredmeta+','+indexStudenta+','+statusPrisustva)
                    novidata=izfajla.replace(regex, novi);
                    fs.writeFile('prisustva.csv', novidata, (err) =>
                    {
                        response.write('{status:"Azurirano prisustvo!"}');
                        return response.end();
                    })
                }
                else if(nepostoji==true && imagreska==false)
                {
                    let zapisi = '\n' + tipCasa + ',' + redniBrojCasa + ',' + sedmica + ',' + kodPredmeta + ',' + indexStudenta + ',' + statusPrisustva;
                    fs.writeFile('prisustva.csv', zapisi, { flag: 'a+' }, (err) =>
                    {
                        response.write('{status:"Kreirano prisustvo!"}');
                        return response.end();
                    })
                }
            })
        });
    }

    // RUTA 4 - GET /prisustvo?kodPredmeta=kodPredmetaValue&indexStudenta=indexValue&sedmica=sedmicaValue
    if(ruta.includes("/prisustvo") && metoda == 'GET')
    {
        puniurl = request.url;
        let regex = /(?<=kodPredmeta=).*(?=&index)/; // Regex da izvadimo kodPredmeta
        let kodPredmeta = puniurl.match(regex)[0];
        regex = /(?<=indexStudenta=).*(?=&sedmica)/; // Regex da izvadimo indexStudenta
        let indexStudenta = puniurl.match(regex)[0];
        regex = /(?<=sedmica=).*(?=)/; // Regex da izvadimo sedmica
        let sedmica = puniurl.match(regex)[0];
        fs.readFile('prisustva.csv', 'UTF-8', (err, izfajla) =>
        {
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
                response.write('{status:"Prisustvo ne postoji!"}')
                return response.end();
            }
            if(nepostoji==false)
            {
                response.write('{prisustvoZaSedmicu: '+ sedmica + ', prisutan: ' + pamtiprisutan + ', odsutan: ' + pamtiodsutan + ', nijeUneseno: ' + pamtinijeuneseno + '}');
                return response.end();
            }
        })
    }
}

const server = http.createServer(handleRequest).listen(8000); // createServer metoda;
module.exports = server;