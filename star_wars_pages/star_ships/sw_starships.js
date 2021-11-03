import { starships } from "../data/starships.js"
import { getLastNumber, removeChildren } from "../utils/index.js"

//query selectors latching onto stuff in html
//my whole page breaks whenever I forget to use the . in front of the class name
const nav = document.querySelector(".nav")
const navList = document.querySelector(".navList")
const shipView = document.querySelector(".displaySection")
const modal = document.querySelector(".modal")
const closeButton = document.querySelector(".modal-close")
const modalBackground = document.querySelector(".modal-background")
const missingMessage = document.querySelector('.missingMessage')

//WHY DOES MY CODE BREAK WHEN I PUT THIS PART ABOVE THE FUNCTIONS?
//closes the modal when we click the little x 
closeButton.addEventListener('click', () => modal.classList.toggle("is-active"))
modalBackground.addEventListener("click" , () => modal.classList.toggle('is-active'))

function populateNav(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement("a")
        anchorWrap.href = "#"
        let listItem = document.createElement("li")
        listItem.textContent = starship.name
        anchorWrap.addEventListener('click', () => {
            populateShipView(starship)
        })
        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

//This makes the stuff show up and remove the old ships. 
//With the modal it now shows that cool box when the image is lost
populateNav(starships)

function populateShipView(shipData) {
    removeChildren(shipView)
    let shipImage = document.createElement("img")
    let shipNum = getLastNumber(shipData.url)
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    //This next part turns on the modal when we get an error
    shipImage.addEventListener('error', () =>{
        shipImage.hidden = true
        modal.classList.toggle("is-active")
        missingMessage.textContent = `No visual contact on ${shipData.name} yet.`
    })
    shipView.appendChild(shipImage)
}
