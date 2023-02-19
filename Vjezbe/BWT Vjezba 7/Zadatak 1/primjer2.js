const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

function napraviTabelu(data)
{
    function napraviRed(row)
    {
        return `<tr>${row}</tr>`;
    }
    function napraviTabelu(data)
    {
        return `<table>${data}</table>`;
    }
    let rows = data.split('\n');
    let dataRows = rows.slice(1);
    const header = napraviRed(rows[0].split(',').map(val => `<th>${val}</th>`).join(''));
    const tableRows = dataRows.map(row =>
    {
        return napraviRed(row.split(',').map(val => `<th>${val}</th>`).join(''));
    });
    return napraviTabelu(header + tableRows);
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/unos', (req, res) =>
{
    res.sendFile(`${__dirname}/unos.html`);
});
app.post('/', (req,res) =>
{
    let {ime, prezime, adresa, broj_telefona} = req.body;
    let data = '\n' + [ime, prezime, adresa, broj_telefona].join(',');
    fs.appendFile('imenik.txt', data, error =>
    {
        if(error)
        {
            throw error;
        }
        fs.readFile('imenik.txt', (error, data) =>
        {
            if(error)
            {
                throw error;
            }
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(` <style> table, th, td {border: 1px solid black;} </style> `+napraviTabelu(data.toString()));
        });
    });
});
app.listen(8085);