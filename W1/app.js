'use strict';

/*
    Skapa ett projekt: npm init
    Installera express: npm install express
    Installera jsdom: npm install jsdom

    1. Starta en webbserver som svarar på port 3000
    2. Lägg till ett middleware för att exponera lämplig mapp (se form.html och katalogstruktur)
    3. Lägg till ett middleware för att kunna avkoda data från formulär (se form.html)

    4. Lägg till endpoint på / för get
    4.1 Vid anrop skicka asynkront form.html till klienten. 
    4.2 Om något går fel returnera felet till klienten och skriv lämlig utdata till konsolen.
    4.3 Om allt gick bra skriv lämplig utdata till konsolen.

    5. Lägg till endpoint på / för post
    5.1 Använd undantagshantering och kontrollera indata för undefined, tomt, numeriskt värde, värde mellan 0-255.
    5.2 Om något utvärderas till true ska ett undantag kastas. 
    5.3 Om ett undantag har kastas skapa en server DOM av form.html (läs in med asynkon metod och hantera enligt 4.2-4.3) och om det har inkommit några värden återplacera dessa i respektive element.
    5.4 Till elementet med id errorMsg skriv ut texten i undantaget som har kastats.
    5.5 Skicka den modifierade server DOM till anropande klient.
    5.6 Om inget har utvärderat till false skapa en server DOM av index.html (läs in med asynkon metod och hantera enligt 4.2-4.3).
    5.7 Modifiera elmentet med id status till att erhålla en backgrundsfärg (rgb()) baserad på inkommande värden.
    5.8 Skicka den modifierade server DOM till anropande klient.
    
    För att testa er lösning använd både webbläsare och Postman.

*/

/*

*/
//Starta express
const express = require('express');
const jsDOM = require('jsdom');
const fs = require('fs');

const app = express();

app.listen(3000, function() {
    console.log('Min Express-server är uppe och svarar på port 3000');
});

//nodemon app.js

// Inställningar för Middleware
app.use('/openDir', express.static(__dirname + '/static'));
app.use(express.urlencoded( { extended : true} ));

//end-point GET '/' --> localhost:3000
app.get('/', function(request, response) {

    response.sendFile(__dirname + '/openDir/html/form.html', function(err) {

        if( err ) {
            console.log( err );
            response.send( err.message );
        } else {
            console.log('Allt ok!', request.url, request.method);
        }

    });

});

//end-point POST '/' --> localhost:3000
app.post('/', function(request, response) {

    console.log(Date.now(), request.body );

    let red = request.body.red;
    let green = request.body.green;
    let blue = request.body.blue;


    try {

        if( red === undefined || blue === undefined || green === undefined) {
            throw new Error('Ange färg');
        }

        red = red.trim();
        green = green.trim();
        blue = blue.trim();

        if(red.length === 0 || green.length === 0 || blue.length === 0 ) {
            throw new Error('Färg får inte vara tomt!');
        }

        if( isNaN(red) || isNaN(green) || isNaN(blue)) {
            throw new Error('Färg skall bestå av heltal!');
        }

        red = parseInt(red);
        green = parseInt(green);
        blue = parseInt(blue);

        if( ( red < 0 || red > 255) || 
        (green < 0 || green > 255) ||
        (blue < 0 || blue > 255) ){
            throw new Error('Färg skall bestå av tal mellan 0 och 255!');
        }

        if( ( red === 0 && green === 0 && blue === 0) ||
        (red === 255 && green === 255 && blue === 255)) {
            throw new Error('Felaktig färg!');
        }

        fs.readFile(__dirname + '/openDir/html/index.html', function( err, data ) {

            if( err ) {
                console.log( err );
                response.send( err.message );
            } else {

                console.log('Allt ok!');
                let serverDOM = new jsDOM.JSDOM( data );

                serverDOM.window.document.querySelector('#status').style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
                data = serverDOM.serialize();

                response.send( data );
            }

        });


    } catch(oError) {

        fs.readFile(__dirname + '/openDir/html/form.html', function( err, data ) {

            if( err ) {
                console.log( err.message );
                response.send( err.message );
            } else {

                let serverDOM = new jsDOM.JSDOM( data );

                if(red !== undefined) {
                    serverDOM.window.document.querySelector('[name=red]').setAttribute('value', red);
                }
                
                if(green !== undefined) {
                    serverDOM.window.document.querySelector('[name=green]').setAttribute('value', green);
                }

                if(blue !== undefined) {
                    serverDOM.window.document.querySelector('[name=red]').setAttribute('value', blue);
                }

                serverDOM.window.document.querySelector('#errorMsg').textContent = oError.message;
                data = serverDOM.serialize();

                response.send( data );
            }
        });
    }

});