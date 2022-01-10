
const firebase = require('firebase/app');

const express = require('express');

const bodyParser = require('body-parser');

const ejs = require('ejs');

const config = require('./static/config');

const app = express();

//using bodyparser
app.use(bodyParser.json())

firebase.initializeApp(config);

app.engine("html", require("ejs").renderFile);
app.use(express.static("static"));
app.get("/signup", function (req, res) {
    res.render("signup.html");
});
app.get("/login", function (req, res) {
    res.render("login.html");
});
app.get("/profile", function (req, res) {
    res.render("profile.html");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});