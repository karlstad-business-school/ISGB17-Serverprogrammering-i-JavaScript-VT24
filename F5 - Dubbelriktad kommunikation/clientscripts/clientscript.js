'use strict';
const socket = io();

window.addEventListener('load', ()=>{
    document.querySelector('a').addEventListener('click', buttonClick);
});

function buttonClick() {
    socket.emit('pierre', null);
}

socket.on('banan', function(data) {

    let body = document.querySelector('body');

    body.setAttribute('style', 'background-color: rgb(' + data.red + ',' + data.green + ',' + data.blue + ');' );

    document.querySelector('h5').textContent = 'Färgen är bytt ' + data.antal + ' gånger';
});

