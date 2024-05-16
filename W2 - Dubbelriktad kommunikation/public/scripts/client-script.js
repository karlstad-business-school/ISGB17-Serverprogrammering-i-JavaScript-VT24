'use strict';

const socket = io();

window.addEventListener('load', ()=> {

    let allaKnappar = document.querySelectorAll('.birdbutton');

    allaKnappar.forEach(knapp => {
        knapp.addEventListener('click', guldfisk);
    });
});

function guldfisk(evt) {
    let imageId = evt.target.getAttribute('data-birdid');
    console.log('bildid: ' + imageId);
    socket.emit('newBackground', {id: imageId});
}
