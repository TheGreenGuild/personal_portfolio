import { films } from '../data/films.js'

let filmList= document.querySelector('#filmList')

for (let i = 0; i<films.length; i++){
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')
    figImg.src = `https://starwars-visualguide.com/assets/img/films/7.jpg`
    let figCaption = document.createElement('figcaption')
    figCaption.textContent = "Film Title Goes here"

figure.appendChild(figImg)
figure.appendChild(figCaption)
filmList.appendChild(figure)
}

//let titleList = document.createElement('ol')
//filmList.appendChild(titleList)