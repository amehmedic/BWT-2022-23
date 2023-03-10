const cors = require("cors");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "vjezba9",
  //password:root,
});

app.use(express.static("scripts"));
app.use(express.static("views"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function generisiTabelu(data) {
  var tabela = `<table>
        <tr>
            <th>Ime I Prezime</th>
            <th>Adresa</th>
            <th>Broj Telefona</th>
        </tr>
    `;

  data.forEach((x) => {
    tabela += `<tr>`;

    Object.values(x).forEach((y) => {
      tabela += `<td>${y}</td>`;
    });

    tabela += `</tr>`;
  });

  tabela += "</table>";

  return tabela;
}

app.get("/imenik", (req, res) => {
  pool.query("SELECT * FROM imenik", (err, results) => {
    if (err) {
      res.json("Greska pri citanju baze.");
    } else {
      res.setHeader("Content-Type", "text/html");
      res.send(generisiTabelu(results));
    }
  });
});

app.post("/imenik", (req, res) => {
  pool.query(
    `INSERT INTO imenik(imePrezime, adresa, brojTelefona) VALUES (?,?,?);`,
    Object.values(req.body),
    (err, results) => {
      if (err) {
        console.log(err);
        res.json("Greska pri pisanju u bazu.");
      } else {
        res.json("Uspjesno dodanu u bazu.");
      }
    }
  );
});

app.get("/poznanik/:kontakt", (req, res) => {
  pool.query(
    `SELECT imenik.imePrezime,imenik.adresa, imenik.brojTelefona FROM imenik, adresar WHERE adresar.idPoznanik = imenik.id AND adresar.idKontakt = ${req.params.kontakt}`,
    [],
    (err, results) => {
      if (err) {
        console.log(err);
        res.json("Greska pri citanju iz baze.");
      } else {
        res.setHeader("Content-Type", "text/html");
        res.json(generisiTabelu(results));
      }
    }
  );
});

// ODGOVORI NA PITANJA
// 1.Da li je va??a aplikacija podlo??na cross-site scripting (XSS) napadima? Mo??e li se unijeti vrijednost koja sadr??i HTML ili
// JavaScript kod? ??ta ??ete u??initi da to sprije??ite?
//
// Perzistentni XSS je posebno opasan oblik XSS napada. Do njega dolazi kada je napada?? u stanju da ubaci maliciozan HTML
// ili JavaScript kod u bazu, tako  da svaki sljede??i posjetilac vidi ovaj kod. Na taj na??in napada?? se mo??e baviti i stvarima kao
// ??to je prikupljanje ??ifara (koriste??i JavaScript mo??e se dodati event listener na polje forme i zatim poslati na udaljeni web servis).
//
// - Ukoliko se XSS ubraja u kolekciju napada koje takozvani "binding parametri" ili "? parametri" sprije??avaju onda ova aplikacija
// nije podlo??na ovom napadu jer bi se zahtjev odbio onog momenta kada bi se prepoznao nevalidan kod, tako??e ovakav napad bi bio
// uspje??an samo za kolone tipa varchar ili drugi tekstualni format
//
// 2. SQL injection je napad koji je po tipu sli??an XSS. U SQL injection propustima postoje upiti koji kao parametar uzimaju vrijednost koju
// je korisnik unio (pretraga redova po nekoj vrijednosti koju je korisnik unio i sl.). Zadatak 5 ima potencijalno mjesto gdje se ovaj propust
//  mo??e pojaviti. Identifikujte problem i probajte iskoristiti navedeni propust. Kod napada koji koristi SQL injection propust zlonamjerni
// korisnik u korisni??ki unos upisuje SQL kod koji mo??e nanijeti ??tetu aplikaciji (obrisati redove, izmijeniti neke vrijednosti i sl.).
//
// Na koji na??in je mogu??e sprije??iti SQL injection? (Pro??itajte u dokumentaciji mysql modula! ??ta je preporuka autora ovog modula?)
//
// - Zadatak 5 ima ovja problem zato ??to prima kontakt kao parametar, a po??ot su podupiti u SQL dozvoljeni, u slu??aju da se po??alje validan SQL
// prvo bi se izvr??io taj podupit pa tek onda na?? serverski upit koji bi vjerovatno bacio gre??ku jer se ne mo??e poredit izme??u int i rezultata tog podupita
// mada bi tad bilo kasno. Ova aplikacija je otporna na SQL injection iz razloga ??to su se koristili binding parametri ??iji je cilj upravo da se
// aplikacija za??titi od ovih napada. Ujedno ovo je i preporu??eni na??in rada i sve SQL varijante i frameworksi podr??avaju ovu pogodnost.