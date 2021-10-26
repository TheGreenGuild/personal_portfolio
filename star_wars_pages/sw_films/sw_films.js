import { films } from '../data/films.js'

let filmList= document.querySelector('#filmList')

for (let i = 0; i<films.length; i++){
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${i+1}.jpg`
    let figCaption = document.createElement('figcaption')

    figCaption.textContent = `https://swapi.co/api/films/5/`
    //add a function later with array.find to match titles with posters

figure.appendChild(figImg)
figure.appendChild(figCaption)
filmList.appendChild(figure)
}

//let titleList = document.createElement('ol')
//filmList.appendChild(titleList)