'use strict';
const fs = require('fs');

//Andra programmet, lyssnare


// D E L  1  F I L E R  *********************************************************************
fs.stat('test.txt', function(err, stats) {
    if(err) {
        console.log("filen finns ej");
    }
    else {
        console.log(fs.readFileSync('test.txt').toString());
        fs.watch('test.txt', function() {
            console.log(fs.readFileSync('test.txt').toString());
        })
    }
});


//******************************************************************************************* */


