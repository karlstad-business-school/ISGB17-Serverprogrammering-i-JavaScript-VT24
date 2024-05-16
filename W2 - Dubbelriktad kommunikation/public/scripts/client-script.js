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

socket.on('newBackground', function(data) {
    let body = document.querySelector('body');
    body.style.backgroundImage = 'url(./public/images/' + data.imageid + '.jpg)';

    let p = document.createElement('p');
    p.textContent = "bilden byttes av " + data.nickname + " klockan " + data.time;
    document.querySelector('header').appendChild(p);

});
