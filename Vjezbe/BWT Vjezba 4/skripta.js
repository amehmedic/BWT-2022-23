var http = require('http');
var fs = require('fs'); 
var xml_js = require('xml-js');


http.createServer((req, res) => 
{
    if (req.method == 'POST')
    {
        let miliSekunde = Date.now();
        let trenutnoVrijeme = new Date(miliSekunde);
        const objekti = [];
        req.on('data', chunk => objekti.push(chunk));
        req.on('end', () =>
        {
            const data = Buffer.concat(objekti);
            let informacije = new URLSearchParams(data.toString('utf8'))
            let file = fs.readFile("users.csv", "UTF-8", (err, data) =>
            {
                let usersRedovi = data.split("\n");
                for (let i = 0; i < usersRedovi.length; i++)
                {
                    let user = usersRedovi[i].split(",");
                    if (user[0].includes(informacije.get("username")))
                    {
                        let loginInformacije = new Object();
                        let dan = trenutnoVrijeme.getDate();
                        if (10 > dan)
                        {
                            dan = "0" + dan;
                        }
                        let mjesec = trenutnoVrijeme.getMonth() + 1;
                        if (10 > mjesec)
                        {
                            mjesec = "0" + mjesec;
                        }
                        let sat = trenutnoVrijeme.getHours()
                        if (10 > sat)
                        {
                            sat = "0" + sat;
                        }
                        let minute = trenutnoVrijeme.getMinutes();
                        if (10 > minute)
                        {
                            minute = "0" + minute;
                        }
                        let sekunde = trenutnoVrijeme.getSeconds();
                        if (10 > sekunde)
                        {
                            sekunde = "0" + sekunde;
                        }
                        loginInformacije.Date = dan + "/" + mjesec + "/" + trenutnoVrijeme.getFullYear() + " " + sat + ":" + minute + ":" + sekunde;
                        let password=informacije.get("password")
                        let hashedPassword=user[1].substr(10)
                        let lozinka = "";
                        for (let i = 0; i < password.length; i++)
                        {
                            lozinka += String.fromCharCode((password.charAt(i).charCodeAt(0) % 16) + 55)
                        }
                        if (lozinka==hashedPassword) 
                        {
                            loginInformacije.LoginSuccessful = true;
                            let usersObject = new Object();
                                usersObject.username = user[0].substr(9);
                                usersObject.password = user[1].substr(10);
                                usersObject.name = user[2].substr(5);
                                usersObject.surname = user[3].substr(8);
                                usersObject.role = user[4].substr(5);
                            loginInformacije.User = usersObject;
                        }
                        else
                        {
                            loginInformacije.LoginSuccessful = false;
                            loginInformacije.username = user[0].substr(9);
                        }
                        let rezultat = xml_js.js2xml(loginInformacije, {spaces: 5, compact: true});
                        res.writeHead(200, {"Content-Type" : "text/xml"});
                        res.write("<LoginInformation>" + rezultat + "</LoginInformation>");
                        console.log(rezultat);
                        res.end();
                    }
                }
            })
        })
    }
}).listen(8080, () =>
{
    console.log("Success");
});

