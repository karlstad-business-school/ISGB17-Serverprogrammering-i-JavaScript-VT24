'use strict';
const http = require('http');
const fs = require('fs');

//Steg 1
/************************************************************* */
/*
http.createServer(function (req,res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write('tjohoooo');
    res.end();
}).listen(3005);
*/
/************************************************************* */

//Steg 2
/************************************************************* */
/*
http.createServer(function (req,res) {

    let filnamn;

    if(req.url == '/') {
        filnamn = 'index.html';
    } 
    else {
        filnamn = req.url;
        filnamn = filnamn.substring(1);
    }

    fs.stat(filnamn, function(err, stats) {
        if(err) {
            res.writeHead(404, { 'Content-Type': 'text/html'});
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(fs.readFileSync(filnamn).toString());
            res.end();
        }
    })

}).listen(3005);
*/
/************************************************************* */

//Steg 3
/************************************************************* */
/*
exports.mySimpleWebServer = function() {
http.createServer(function (req,res) {

    let filnamn;

    if(req.url == '/') {
        filnamn = 'index.html';
    } 
    else {
        filnamn = req.url;
        filnamn = filnamn.substring(1);
    }

    fs.stat(filnamn, function(err, stats) {
        if(err) {
            res.writeHead(404, { 'Content-Type': 'text/html'});
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(fs.readFileSync(filnamn).toString());
            res.end();
        }
    })

}).listen(3005);
}
*/
/************************************************************* */













