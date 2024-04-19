'use strict';
const fs = require('fs');

console.log('Start körning...');
silverfisk().then((returvarde)=> {
    console.log(returvarde);
});
console.log('BAAAAH');


async function silverfisk() {
    console.log('Startar filläsning');

    let megaFilen = await fs.readFileSync('stor-fil.txt').toString();

    for(let i=0; i<1; i++) {
        for(let j=0; megaFilen.length; j++) {
            if(megaFilen[j]=='a') {
                //megaFilen[j]='b';

            }
        }
    }
    console.log('Beräkningar färdiga!');
    return Promise.resolve('Tjo!');
}