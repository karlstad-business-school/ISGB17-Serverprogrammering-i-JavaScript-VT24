'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cookieParser =  require('cookie-parser');
const io = require('socket.io')(http);
const mymodule =  require('./my-module');

app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use("/public", express.static(__dirname + '/public'));

let server = http.listen(3001, function() {
    console.log('jadaddadada');
});

app.get('/silverfisk', function(req,res) {
    if(req.cookies.nickname === undefined) {
        res.sendFile(__dirname + '/loggain.html');
    }
    else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/silverfisk', function(req,res) {

    let nickname = req.body.nickname;

    if(nickname.length<5) {
        res.send('FEL');
    }
    else {
        res.cookie('nickname', nickname, { maxAge: 1000*60*5 });
        res.redirect('/silverfisk');
    }

});

io.on('connection', (socket)=> {
    console.log('Ny användare ansluten');

    let kakstring = socket.handshake.headers.cookie;
    let kakor = mymodule.parseCookies(kakstring);

    if(kakor.nickname != null){
        socket.nick = kakor.nickname;
    }
    console.log(kakor);


    socket.on('newBackground', function(data) {
        console.log('bildid: ' + data.id);
        io.emit('newBackground', {'imageid': data.id, 'time': mymodule.getTimeStamp(), 'nickname': socket.nick});
    });

});