const express = require("express");
const app = express();
const PORT = 8085;
app.use(express.static("public"));
app.get("/index.html", function (req, res)
{
    res.sendFile(__dirname + "/public/" + "index.html");
});
app.listen(PORT, () =>
{
    console.log(`${PORT}...`)
});