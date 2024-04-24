'use strict';
//Skapa projekt: npm init
//nodemon finns sedan tidigare installerat globalt (npm install -g nodemon)
//installera express: npm install express

//2.1-2.3
//1. Starta upp en express-server som lyssnar på port 3000.
//2. Lägg till get end-point "/" och skicka static/html/index.html och använd asynk-funktion.
//3. Lägg till get end-point "/favicon.ico" och skicka static/ico/favicon.ico och använd asynk.

//2.4-2.6
//4. Lägg till middleware för /static och urlencoded för formulär.
//5. Lägg till post end-point för "/" och kontrollera indata samt skicka static/html/index.html och använd asynk-funktion. Använda Postman för att testa!
//6. Lägg till put och delete end-points för "/" samt skicka static/html/index.html och använd asynk-funktion. Använda Postman för att testa!
    
const express = require('express');

let app = express();

app.listen(3000, function() {
    console.log('Servern är igång på port 3000');
});

app.get('/', function(request, response){

    console.log( request.method, request.query); //OBS query vid GET!

    response.sendFile(__dirname + '/static/html/index.html', function( err ) {
        //Felhantering...
    });


});

app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded( { extended : true }));

app.post('/', function(request, response ) { //När användaren skriver ngt i textrutan och trycker på Send-knappen.

    console.log( request.method, request.body); //OBS body vid POST!
    response.sendFile(__dirname + '/static/html/index.html', function( err ) {
        //Felhantering...
    });

});

