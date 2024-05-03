const http = require('http');

const option = {

    hostname : 'localhost',
    port : 3000,
    path : '/',
    method : 'GET'

};

let httpRequest = http.request(option, function( response ) {

    response.on( 'data', function( data ) {
        console.log( data, data.toString());
    });

});

httpRequest.end();
