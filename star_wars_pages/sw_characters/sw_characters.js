

// I changed the code last time by removing the while loop and something broke here. 
import { people } from "../data/people.js";
import { getLastNumber, removeChildren} from "../utils/index.js";

const mainContent = document.querySelector("#main");

populateDOM(people);
//made a header
const header = document.createElement("header");

const maleButton = document.createElement("button");
maleButton.textContent = "Male Characters";
maleButton.addEventListener("click", () => populateDOM(maleCharacters));

const femaleButton = document.createElement("button")
femaleButton.textContent = "Female Characters"
femaleButton.addEventListener("click", () => populateDOM(femaleCharacters));

const otherButton = document.createElement("button")
otherButton.textContent = "Other Characters"
otherButton.addEventListener("click", () => populateDOM(otherCharacters))

const allButton = document.createElement("button")
allButton.textContent = "All Characters"
allButton.addEventListener("click", () => populateDOM(allCharachters))

//header title? 
const returnButton = document.createElement("button")
returnButton.textContent = "Home Page"


//attaches those buttons to the header where I want them to be. 
header.appendChild(allButton)
header.appendChild(femaleButton)
header.appendChild(maleButton)
header.appendChild(otherButton)

//IDK why I need this line to specify that. Maybe it's just the order I made stuff in? 
document.body.insertBefore(header, mainContent);

const maleCharacters = people.filter((person) => person.gender === "male");
const femaleCharacters = people.filter((person) => person.gender === "female");
const otherCharacters = people.filter((person) => {
  if (person.gender !== "male" && person.gender !== "female") {
    return person;
  }
})
const allCharachters = people 

function populateDOM(characters) {
  //first clear the page, then populate
  //The list is LIVE so it will reindex each call
  removeChildren(mainContent) 

  characters.forEach((person, index) => {
    const charFigure = document.createElement("figure")
    const charImg = document.createElement("img")
    const charNum = getLastNumber(person.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    const charCaption = document.createElement("figcaption")
    charCaption.textContent = person.name;

    charFigure.appendChild(charImg);
    charFigure.appendChild(charCaption);
    mainContent.appendChild(charFigure);
  })
}
