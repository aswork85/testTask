
// Application initialization
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var url = require("url");
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public'))).listen(8888,'127.0.0.1');


app.all('/*Sub*/', function(error, req, res, next){
    var subController = require('./controller/controllerSub.js');
    var s = subController.initSubController;
    if(req.url === '/allSubdivisions'){s.allSub(res); }
    if(req.url === '/addSubdivision'){ s.addSub(req,res); }
    if(req.url === '/updateSubdivision'){ s.updateSub(req,res); }
    if(req.url === '/deleteSubdivision'){ s.deleteSub(req,res); }
    next();
});

app.use(function(req,res){
    res.status(404).send('error 404, page not found');
    res.end();
});

console.log('Server started');











