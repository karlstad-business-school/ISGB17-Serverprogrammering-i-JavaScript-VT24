'use strict';

function JaEllerNej() {
        return new Promise( function(resolve,reject) {
            let tal = Math.round(Math.random() * 1); //(=true eller false)
            if(tal) {
                resolve('Lyckades!');
            }
            else {
                reject('Feeeel!');
            }
        });
}

async function msg() {
    
    let svar = await JaEllerNej();
    return svar;
}

msg().then(function(x) { console.log(x )}).catch(function(err) { console.log(err) });