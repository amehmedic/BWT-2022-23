const http = require('http');
const fs = require('fs');
const url = require("url");

http.createServer(function (req,res) {
    if(req.method=='GET') {
        // dodano
        // gledamo ima li url parametar q
        // ako ima nalazimo tu vrijednost 
        //console.log(url.parse(req.url,true).query.q);
        let vrijednostQ = url.parse(req.url,true).query.q;
        
        let txt = fs.readFileSync('imenik.txt',function (err,data) {
            if(err) {
                throw err;
            }
        });
        // dijelimo  u niz
        var niz = txt.toString().split('\n');
        let rezultat = [];

        // nalazimo vrijednosti kljuceva
        let kljucevi = niz[0].split(', ');
        // ostali redovi su trazene vrijednosti
        for(let i = 0; i < niz.length - 1; i++) {
            // prazan objekat koji punimo podacima
            let objekat = {}
            // red podataka
            let red = niz[i+1];
            
            
            let vrijednosti = red.split(', ');
            
            // ako ima parametar i ako ime ne sadrzi q preskacemo iteraciju ubacivanja
            if(vrijednostQ) {
                let ime = vrijednosti[0];
                if(!(ime.toString().toLowerCase().includes(vrijednostQ.toString().toLowerCase()))) {
                    continue;
                }
            }

            // sada za privremeni objekat dodajemo kljuceve i vrijenosti
            for(let j in kljucevi) {
                if (vrijednosti[j].includes('\n')) {
                    objekat[kljucevi[j]] = vrijednosti[j]
                        .replace('\n','');
                }
                else objekat[kljucevi[j]] = vrijednosti[j];
                
            }

            // dodajemo objekat u niz rezultata
            rezultat.push(objekat);
        }
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.write(JSON.stringify(rezultat));
        res.end();
    }
}).listen(8080);