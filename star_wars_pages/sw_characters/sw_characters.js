import { people } from '../data/people.js'

const mainContent = document.querySelector("#main")

people.forEach(element =>{
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    charImg.src =`https://starwars-visualguide.com/assets/img/characters/1.jpg`
    charFigure.appendChild(charImg)
    mainContent.appendChild(charFigure)
    
})



//This is all stuff we covered in our Oct 26th class v v v 
/*
maleButton.addEventListener('click', () => console.log("Thanks for listening!"))

const charNum = getLastNumber(element.url)
    charImg.src - `url ${charNum}`

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end-2
    if(url.charAt(start) === '/'){
        start++
    }
    return url.slice(start, end)
}
*/
//in todays class Oct 26th we covered how to get the correct photos using cool string
//methods. Then we talked about the OS and hoisting. I can skip that stuff later. 
//Then about  min before class end we talked about 