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
// 1.Da li je vaša aplikacija podložna cross-site scripting (XSS) napadima? Može li se unijeti vrijednost koja sadrži HTML ili
// JavaScript kod? Šta ćete učiniti da to spriječite?
//
// Perzistentni XSS je posebno opasan oblik XSS napada. Do njega dolazi kada je napadač u stanju da ubaci maliciozan HTML
// ili JavaScript kod u bazu, tako  da svaki sljedeći posjetilac vidi ovaj kod. Na taj način napadač se može baviti i stvarima kao
// što je prikupljanje šifara (koristeći JavaScript može se dodati event listener na polje forme i zatim poslati na udaljeni web servis).
//
// - Ukoliko se XSS ubraja u kolekciju napada koje takozvani "binding parametri" ili "? parametri" spriječavaju onda ova aplikacija
// nije podložna ovom napadu jer bi se zahtjev odbio onog momenta kada bi se prepoznao nevalidan kod, takođe ovakav napad bi bio
// uspješan samo za kolone tipa varchar ili drugi tekstualni format
//
// 2. SQL injection je napad koji je po tipu sličan XSS. U SQL injection propustima postoje upiti koji kao parametar uzimaju vrijednost koju
// je korisnik unio (pretraga redova po nekoj vrijednosti koju je korisnik unio i sl.). Zadatak 5 ima potencijalno mjesto gdje se ovaj propust
//  može pojaviti. Identifikujte problem i probajte iskoristiti navedeni propust. Kod napada koji koristi SQL injection propust zlonamjerni
// korisnik u korisnički unos upisuje SQL kod koji može nanijeti štetu aplikaciji (obrisati redove, izmijeniti neke vrijednosti i sl.).
//
// Na koji način je moguće spriječiti SQL injection? (Pročitajte u dokumentaciji mysql modula! Šta je preporuka autora ovog modula?)
//
// - Zadatak 5 ima ovja problem zato što prima kontakt kao parametar, a pošot su podupiti u SQL dozvoljeni, u slučaju da se pošalje validan SQL
// prvo bi se izvršio taj podupit pa tek onda naš serverski upit koji bi vjerovatno bacio grešku jer se ne može poredit između int i rezultata tog podupita
// mada bi tad bilo kasno. Ova aplikacija je otporna na SQL injection iz razloga što su se koristili binding parametri čiji je cilj upravo da se
// aplikacija zaštiti od ovih napada. Ujedno ovo je i preporučeni način rada i sve SQL varijante i frameworksi podržavaju ovu pogodnost.