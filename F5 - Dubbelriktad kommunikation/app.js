'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let counter = 0;

app.use('/silverfisk', express.static(__dirname + '/clientscripts'));
http.listen(3001, ()=>{
    console.log('lyssnar på 3001');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(req,res){
    res.sendFile(__dirname + '/favicon.ico');
});

io.on('connection', (socket)=> {
    console.log('Användare ansluten på socket');

    socket.on('pierre', slump);

    function slump(fisk) {
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);

        counter++;

        io.emit('banan', { 'red': r, 'green': g, 'blue': b, 'antal': counter });
        
    }

});

