import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList')

filmList.textContent = 'This is my content, it isnt very long.'

for (let i = 0; i <films.length; i++){
    let figure = document.createElement{'figure'}
    let figImg = document.createElement{'img'}
    figImg.src = 'https://starwars-visualguide.com/assets/img/films/1.jpg'
    let figCaption = document.createElement{'figcaption'}
    figCaption.textContent = 'File Title Goes Here'

    figure.appendChild{figImg}
    figure.appendChild{figCaption}
    figure.appendChild{figure}
}
// add a function later that will ge the url propery and use array.find to match the
// titles with the films