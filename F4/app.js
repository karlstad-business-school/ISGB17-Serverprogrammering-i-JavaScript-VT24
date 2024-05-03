'use strict';

const express = require('express');
const fs = require('fs');
const jsDOM = require('jsdom');
const cookieParser = require('cookie-parser');


const app = express();

app.listen(3000, function() {
    console.log('Servern är startad på port 3000!');
});

//Middleware
app.use('/openDir', express.static(__dirname + '/openDir'));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

//GET på / returnera form.html
app.get('/', function(request, response) {

    response.sendFile(__dirname + '/openDir/html/form.html', function(err) {
        if( err ) {
            console.log( err );
            request.send( err );
        } else {
            console.log('Allt ok!');
        }
    });

});


//POST på / returnera form.html eller index.html beroend på om allt går bra eller inte!
app.post('/', function(request, response) {

    try{

        //Här skall alla kontroller genomföras
       let red = request.body.red;
        let green = request.body.green;
        let blue = request.body.blue;
        
        console.log( request.body );

        if(red === undefined || green === undefined || blue === undefined) {
            console.log('Någon indata är undefined!');
            throw new Error('Ange färg!');
        }

        if(red === '' || green === '' || blue === '') {
            console.log('Någon indata är en sträng!');
            throw new Error('Färg får inte vara tomt!');
        }

        if(isNaN(red) || isNaN(green) || isNaN(blue)) {
            console.log('Någon indata är inte ett tal!');
            throw new Error('Färg måste vara numeriskt!');
        }

        red = parseInt(red);
        green = parseInt(green);
        blue = parseInt(blue);

        if((red < 0 || red > 255) || (green < 0 || green > 255) || (blue < 0 || blue > 255)) { //Gäller alla färger
            console.log('Någon indata är inte mellan 0 och 255');
            throw new Error('Färg skall vara mellan 0-255!');
        }

        //Skapa ngr kakaor
        response.cookie('red', red);
        response.cookie('green', green);
        response.cookie('blue', blue);

        //Om allt ok gör ngt       
        fs.readFile(__dirname + '/openDir/html/index.html', function( err , data) {

            if( err ) {
                console.log( err );
                response.send( err );
            } else {
                //Vi har läst upp filen som nu finns i data
                let serverDOM = new jsDOM.JSDOM( data );
                serverDOM.window.document.querySelector('#status').style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
                data = serverDOM.serialize();
                response.send( data );
                console.log('Allt ok för hela POST!');

            }
        });

    }catch(oError) {

        // response.send( oError.message )
        //Ngt har gått fel / ett undantag har kastats ovan
        fs.readFile(__dirname + '/openDir/html/form.html', function( err, data ) {

            if( err ) {
                console.log( err );
                response.send( err );
            } else {
                //Vi har läst upp filen som nu finns i data
                let serverDOM = new jsDOM.JSDOM( data );

                if( request.body.red !== undefined ) {
                    serverDOM.window.document.querySelector('[name=red]').setAttribute('value', request.body.red);
                }

                if( request.body.green !== undefined ) {
                    serverDOM.window.document.querySelector('[name=green]').setAttribute('value', request.body.green);
                }

                if( request.body.blue !== undefined ) {
                    serverDOM.window.document.querySelector('[name=blue]').setAttribute('value', request.body.blue);
                }

                serverDOM.window.document.querySelector('#errorMsg').textContent = oError.message;

                data = serverDOM.serialize();
                response.send( data );

                console.log('Allt ok i Catch!');

            }

        });
    }

});

app.get('/reset', function(request, response) {

    console.log(request.cookies);

    if( request.cookies.red !== undefined && 
        request.cookies.green !== undefined && 
        request.cookies.blue !== undefined) {

            response.clearCookie('red');
            response.clearCookie('green');
            response.clearCookie('blue');

    } 

    response.redirect('/');
});


app.get('/start', function(request, response) {

    console.log(request.cookies);

    let red = request.cookies.red;
    let green = request.cookies.green;
    let blue = request.cookies.blue;

    if( red !== undefined && green !== undefined && blue !== undefined) {

        fs.readFile(__dirname + '/openDir/html/index.html', function( err , data) {

            if( err ) {
                console.log( err );
                response.send( err );
            } else {
                //Vi har läst upp filen som nu finns i data
                let serverDOM = new jsDOM.JSDOM( data );
                serverDOM.window.document.querySelector('#status').style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
                data = serverDOM.serialize();
                response.send( data );
                console.log('Allt ok för hela POST!');

            }
        });

    } else {
        response.redirect('/');
    }

});
