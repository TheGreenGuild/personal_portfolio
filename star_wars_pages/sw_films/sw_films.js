import { films } from '../data/films.js'

let filmList= document.querySelector('#filmList')

filmList.textContent = 'this is my content'

let myImg = document.createElement('img')
myImg.src = `https://starwars-visualguide.com/assets/img/films/7.jpg`

filmList.appendChild(myImg)

let titleList = document.createElement('ol')
filmList.appendChild(titleList)

for (let i = 0; i<films.length; i++){
    console.log(films[i].title)
    let listItem = document.createElement('li')
    listItem.textContent = films[i].title
    titleList.appendChild(listItem)
}
