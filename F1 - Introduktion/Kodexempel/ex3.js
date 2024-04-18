'use strict';
const http = require('http');
const fs = require('fs');
const uc = require('upper-case')

// Del 1
/*
http.createServer(function(req,res) {
    console.log('tjo!');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('<h1>S I L V E R  F I S K ! ! !</h1>');
}).listen(3005);
*/
//Del 2
/*
http.createServer(function(req,res) {
    console.log('tjo!');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    let html = fs.readFileSync('minHtmlFil.html').toString();
    res.end(html);
}).listen(3005);
*/
//Del 3
http.createServer(function(req,res) {
    console.log('tjo!');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    let html = fs.readFileSync('minHtmlFil.html').toString();
    let storHtml = uc.upperCase(html);
    res.end(storHtml);
}).listen(3005);