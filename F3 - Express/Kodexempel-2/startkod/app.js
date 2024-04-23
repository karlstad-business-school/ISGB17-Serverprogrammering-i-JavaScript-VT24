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
    
//2.1.-2.3
const express = require('express');

let app = express();

app.listen(3000, function() {
    console.log( 'Japp servern är uppe!');
});

app.get('/', function(request, response) {

    console.log( request.method, request.query);
    response.sendFile( __dirname + '/static/html/index.html', function( err ) {
        //skicka meddelande till användaren att ngt gått fel
    });

});

app.get('/favicon.ico', function(request, response) {

    response.sendFile( __dirname + '/static/ico/favicon.ico', function( err ) {
        //skicka meddelande till användaren att ngt gått fel
    });

});


//2.4-2.6
//Middleware
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));

app.post('/', function(request, response) {
    console.log( request.method, request.body, __dirname);
    console.log(__filename);
    response.sendFile(__dirname + '/static/html/index.html');
});

app.put('/', function(request, response) {
    console.log( request.method, request.body);
    response.sendFile(__dirname + '/static/html/index.html');
});

app.delete('/', function(request, response) {
    console.log( request.method, request.body);
    response.sendFile(__dirname + '/static/html/index.html');
});




